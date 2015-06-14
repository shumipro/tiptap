package views

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/ChimeraCoder/anaconda"
	"github.com/go-xweb/uuid"
	"github.com/guregu/kami"
	"golang.org/x/net/context"
	"gopkg.in/mgo.v2"

	"github.com/shumipro/tiptap/server/login"
	"github.com/shumipro/tiptap/server/oauth"
	"github.com/shumipro/tiptap/server/repository"

	"github.com/shumipro/tiptap/server/paypal"
	"github.com/shumipro/tiptap/server/service"
	"github.com/shumipro/tiptap/server/templates"
)

func init() {
	kami.Get("/login", Login)
	kami.Get("/logout", Logout)
	kami.Get("/login/twitter", LoginTwitter)
	kami.Get("/login/paypal", LoginPayPal)
	kami.Get("/auth/paypal/callback", AuthPayPalCallback)
	kami.Get("/auth/twitter/callback", AuthTwitterCallback)
}

func Login(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	if _, ok := login.FromContext(ctx); ok {
		// login済みならmypageへ
		http.Redirect(w, r, "/", 302)
		return
	}

	preload := templates.NewHeader(ctx, "Login", "", "", false, "", "")
	templates.ExecuteTemplate(ctx, w, r, "login", preload)
}

func Logout(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	login.ResetCacheAuthToken(ctx, w, r)
	http.Redirect(w, r, "/login", 302)
}

func LoginTwitter(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	c := oauth.Twitter(ctx)

	requestURL, err := c.GetRequestTokenAndURL()
	if err != nil {
		panic(err)
	}

	http.Redirect(w, r, requestURL, 302)
}

func AuthTwitterCallback(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	c := oauth.Twitter(ctx)

	values := r.URL.Query()
	verificationCode := values.Get("oauth_verifier")
	tokenKey := values.Get("oauth_token")

	accessToken, err := c.AuthorizeToken(oauth.GetTwitterToken(tokenKey), verificationCode)
	if err != nil {
		panic(err)
	}

	twCli := anaconda.NewTwitterApi(accessToken.Token, accessToken.Secret)
	twUser, err := twCli.GetUsersShow(accessToken.AdditionalData["screen_name"], nil)
	if err != nil {
		panic(err)
	}

	var a login.Account
	var user repository.User
	var userAuth repository.UserAuth
	a, err = login.GetAccountBySession(ctx, r)
	if err == nil {
		// Twitterもしくはfacebookですでにでログイン済み
		user, err = repository.UsersRepository.FindID(ctx, a.UserID)
	} else {
		user, err = repository.UsersRepository.FindByTwitterID(ctx, twUser.Id)
	}
	if err != nil && err != mgo.ErrNotFound {
		panic(err)
	} else if err == mgo.ErrNotFound {
		// 新規登録
		user = registerUser(twUser.Name)
		user.TwitterUser = twUser
		user.ImageURL = user.IconImageURL()
		user.LargeImageURL = user.IconLargeImageURL()

		userAuth.UserID = user.ID
	} else {
		userAuth, _ = repository.UserAuthRepository.FindID(ctx, user.ID)
		// 登録済み更新
		log.Println("とうろくずみ", user)

		if userAuth.TwitterToken != "" && user.TwitterUser.Id != twUser.Id {
			// 不正ログイン？
			panic(fmt.Errorf("bad login twitter %d != %d", user.TwitterUser.Id, twUser.Id))
		}
	}

	user.TwitterUser = twUser
	userAuth.TwitterToken = accessToken.Token

	// TODO: 一旦Beaconは固定
	user.Beacon.MajorID = 42051
	user.Beacon.MinorID = 29428

	if err := repository.UsersRepository.Upsert(ctx, user); err != nil {
		panic(err)
	}

	if err := repository.UserAuthRepository.Upsert(ctx, userAuth); err != nil {
		panic(err)
	}

	// RedisでCacheとCookieに書き込む
	if err := login.CacheLoginAccount(ctx, w, r, user.ID); err != nil {
		panic(err)
	}

	http.Redirect(w, r, "/", 302)
}

func registerUser(name string) repository.User {
	user := repository.User{}
	user.ID = uuid.New()
	user.Name = name

	nowTime := time.Now()
	user.CreateAt = nowTime
	user.UpdateAt = nowTime

	return user
}

func LoginPayPal(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	c, _ := oauth.FromPayPalContext(ctx)
	http.Redirect(w, r, c.AuthCodeURL(""), 302)
}

func AuthPayPalCallback(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	code := r.FormValue("code")
	token, err := oauth.GetPayPalAuthToken(ctx, code)
	if err != nil {
		panic(err)
	}

	_ = token

	fmt.Println(token)

	client, ok := paypal.FromPayPalClient(ctx)
	if !ok {
		panic("not paypal client errror")
	}

	u, err := client.Identity.UserInfo()
	if err != nil {
		panic(err)
	}

	a, err := login.GetAccountBySession(ctx, r)
	if err != nil {
		panic(err)
	}

	if err := service.Payout.ExecutePayoutQueue(ctx, a.UserID, u.Email); err != nil {
		panic(err)
	}

	// TODO: なんかダイアログ出す感じ?
	http.Redirect(w, r, "/", 302)
}
