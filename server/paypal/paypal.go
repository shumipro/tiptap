package paypal

import (
	"errors"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/kyokomi/goroku"
	"github.com/kyokomi/paypal"
	"golang.org/x/net/context"
)

var (
	ErrNonClientID = errors.New("env error PAYPAL_CLIENTID")
	ErrNonSecret   = errors.New("env error PAYPAL_SECRET")
	ErrNonBaseURL  = errors.New("env error BASE_URL")
)

type authKey string

const (
	payPalClientKey = authKey("payPalClient")
	// Redis
	payPalAdminAccessTokenRedisKey = "payPalAdmin:token"
)

type PayPalClient struct {
	*paypal.PayPalClient
	BaseURL string
}

func NewPayPalClient(ctx context.Context) context.Context {
	ctx, err := WithPayPalClient(ctx)
	if err != nil {
		log.Println(err)
	}
	return ctx
}

func WithPayPalClient(ctx context.Context) (context.Context, error) {
	clientID := os.Getenv("PAYPAL_CLIENTID")
	if clientID == "" {
		return ctx, ErrNonClientID
	}
	secret := os.Getenv("PAYPAL_SECRET")
	if secret == "" {
		return ctx, ErrNonSecret
	}
	baseURL := os.Getenv("BASE_URL")
	if baseURL == "" {
		return ctx, ErrNonBaseURL
	}

	opts := paypal.NewOptions(clientID, secret)
	opts.Sandbox = true // TODO: development

	c := PayPalClient{}
	c.BaseURL = baseURL
	c.PayPalClient = paypal.NewClient(opts)

	// Cacheあれば使う
	var err error
	if token, ok := readCachePayPalAdmin(ctx); ok {
		log.Println("payPalAdmin cache ok")
		c.Admin = token
	} else {
		c.Admin, err = c.OAuth2.GetToken()
		if err != nil {
			return ctx, err
		}
		log.Println("payPalAdmin no cache")
	}

	// Cacheする
	if err := writeCachePayPalAdmin(ctx, c.Admin); err != nil {
		// 一応とれてるからログだけだす
		log.Println(err)
	}

	return context.WithValue(ctx, payPalClientKey, c), nil
}

func FromPayPalClient(ctx context.Context) (PayPalClient, bool) {
	token, ok := ctx.Value(payPalClientKey).(PayPalClient)
	return token, ok
}

func readCachePayPalAdmin(ctx context.Context) (paypal.AdminAuthToken, bool) {
	redisDB, ok := goroku.Redis(ctx)
	if !ok {
		return paypal.AdminAuthToken{}, false
	}
	adminToken, err := redisDB.HGetAllMap(payPalAdminAccessTokenRedisKey).Result()
	if err != nil || len(adminToken) == 0 {
		return paypal.AdminAuthToken{}, false
	}

	var token paypal.AdminAuthToken
	token.AppID = adminToken["app_id"]
	token.Scope = adminToken["scope"]
	token.ExpiresIn, _ = strconv.Atoi(adminToken["expires_in"])
	token.TokenType = adminToken["token_type"]
	token.AccessToken = adminToken["access_token"]
	return token, true
}

func writeCachePayPalAdmin(ctx context.Context, adminToken paypal.AdminAuthToken) error {
	redisDB, ok := goroku.Redis(ctx)
	if !ok {
		return nil
	}

	err := redisDB.HMSet(payPalAdminAccessTokenRedisKey,
		"access_token", adminToken.AccessToken,
		"app_id", adminToken.AppID,
		"scope", adminToken.Scope,
		"expires_in", strconv.Itoa(adminToken.ExpiresIn),
		"token_type", adminToken.TokenType,
	).Err()
	if err != nil {
		return err
	}

	// The lifetime in seconds of the access token. Value assigned by PayPal.
	return redisDB.Expire(
		payPalAdminAccessTokenRedisKey,
		time.Duration(adminToken.ExpiresIn)*time.Second,
	).Err()
}
