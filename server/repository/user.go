package repository

import (
	"fmt"
	"time"

	"github.com/ChimeraCoder/anaconda"
	"golang.org/x/net/context"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	ID            string        `bson:"_id"      json:"ID"`            // UUID自動生成
	Name          string        `                json:"Name"`          // ユーザー名
	ImageName     string        `                json:"ImageName"`     // アップロードしたファイル名
	ImageURL      string        `                json:"ImageURL"`      // ユーザーアイコンのURL
	LargeImageURL string        `                json:"LargeImageURL"` // ユーザーアイコンの大きいURL
	Comment       string        `             	 json:"Comment"`        // ひとこと
	HomePageURL   string        `             	 json:"HomePageURL"`    // ウェブサイトURL
	GitHubURL     string        `             	 json:"GitHubURL"`      // Github URL
	TwitterUser   anaconda.User `bson:"twitter"  json:"TwitterUser"`   // Twitterのshows情報
	CreateAt      time.Time     `                json:"-"`
	UpdateAt      time.Time     `                json:"-"`
}

func (u User) IconImageURL() string {
	if u.ImageURL != "" {
		return u.ImageURL
	}

	if u.TwitterUser.Id != 0 {
		return u.TwitterUser.ProfileImageUrlHttps
	}

	return "/img/no_img/no_img_1.png"
}

func (u User) IconLargeImageURL() string {
	if u.LargeImageURL != "" {
		return u.LargeImageURL
	}

	if u.TwitterUser.Id != 0 {
		return u.TwitterUser.ProfileImageUrlHttps
	}

	return "/img/no_img/no_img_1.png"
}

func (u User) IsEmpty() bool {
	return u.ID == ""
}

type _UsersRepository struct {
}

func (_ _UsersRepository) Name() string {
	return "users"
}

var _ repository = (*_UsersRepository)(nil)

var UsersRepository = _UsersRepository{}

func (t _UsersRepository) withCollection(ctx context.Context, fn func(c *mgo.Collection)) {
	withDefaultCollection(ctx, t.Name(), fn)
}

// ----------------------------------------------

func (t _UsersRepository) FindID(ctx context.Context, userID string) (result User, err error) {
	t.withCollection(ctx, func(c *mgo.Collection) {
		err = c.FindId(userID).One(&result)
	})
	return
}

func (t _UsersRepository) FindByTwitterID(ctx context.Context, twitterID int64) (result User, err error) {
	t.withCollection(ctx, func(c *mgo.Collection) {
		err = c.Find(bson.M{"twitter.id": twitterID}).One(&result)
	})
	return
}

func (t _UsersRepository) FindByKeyword(ctx context.Context, keyword string) (results []User, err error) {
	regexWord := fmt.Sprintf(".*%s.*", keyword)
	fmt.Println("Keyword = ", regexWord)

	t.withCollection(ctx, func(c *mgo.Collection) {
		err = c.Find(bson.M{"name": bson.M{
			"$regex":   regexWord,
			"$options": "i",
		}}).All(&results)
	})
	return
}

// Upsert 登録
func (t _UsersRepository) Upsert(ctx context.Context, user User) error {
	var err error
	t.withCollection(ctx, func(c *mgo.Collection) {
		var result interface{} // bson.M
		_, err = c.FindId(user.ID).Apply(mgo.Change{
			Update: user,
			Upsert: true,
		}, &result)
	})
	return err
}
