package server

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"runtime"
	"strings"

	"github.com/guregu/kami"
	"github.com/kyokomi/goroku"
	"golang.org/x/net/context"

	"github.com/shumipro/tiptap/server/errors"
	"github.com/shumipro/tiptap/server/paypal"
	"github.com/shumipro/tiptap/server/templates"

	_ "github.com/shumipro/tiptap/server/apis"
	_ "github.com/shumipro/tiptap/server/views"
)

// Serve start Serve
func Serve() {
	cpus := runtime.NumCPU()
	runtime.GOMAXPROCS(cpus)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)

	ctx := context.Background()
	ctx = goroku.OpenMongoDB(ctx) // insert mongoDB
	defer goroku.CloseMongoDB(ctx)
	ctx = goroku.OpenRedis(ctx) // insert redis
	defer goroku.CloseRedis(ctx)
	ctx = goroku.NewCloudinary(ctx)
	ctx = goroku.NewAirbrake(ctx, "production")

	ctx = paypal.NewPayPalClient(ctx)

	ctx = templates.InitTemplates(ctx, "./")

	kami.Context = ctx
	kami.PanicHandler = errors.PanicHandler

	// middleware
	kami.Use("/", secureRedirect)

	fileServer := http.FileServer(http.Dir("public"))
	for _, name := range []string{
		"/css/*css",
		"/dist/*dist",
		"/img/*img",
		"/js/*js",
		"/favicon.ico",
		"/robots.txt",
		"/sitemap.xml",
	} {
		kami.Get(name, func(ctx context.Context, w http.ResponseWriter, r *http.Request) {
			fileServer.ServeHTTP(w, r)
		})
	}

	log.Println("Starting server...")
	log.Println("GOMAXPROCS: ", cpus)
	kami.Serve()
}

func secureRedirect(ctx context.Context, w http.ResponseWriter, r *http.Request) context.Context {
	if isHttps(r) {
		return ctx
	}

	if r.Header.Get("X-Forwarded-Proto") == "" {
		return ctx
	}

	url, err := url.Parse("https://" + r.Host + r.RequestURI)
	if err != nil {
		return ctx
	}
	url.RawQuery = r.URL.RawQuery
	r.URL = url
	fmt.Println(url.String())
	http.Redirect(w, r, url.String(), 302) // TODO: 301?
	return nil
}

func isHttps(r *http.Request) bool {
	if r.URL.Scheme == "https" {
		return true
	}
	if strings.HasPrefix(r.Proto, "HTTPS") {
		return true
	}
	if r.Header.Get("X-Forwarded-Proto") == "https" {
		return true
	}
	return false
}
