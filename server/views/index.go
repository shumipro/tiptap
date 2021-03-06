package views

import (
	"log"
	"net/http"

	"github.com/guregu/kami"
	"github.com/shumipro/tiptap/server/login"
	"github.com/shumipro/tiptap/server/service"
	"github.com/shumipro/tiptap/server/templates"
	"github.com/shumipro/tiptap/server/viewmodels"
	"golang.org/x/net/context"
)

func init() {
	kami.Get("/", Index)
}

type IndexResponse struct {
	templates.TemplateHeader
	viewmodels.IndexViewModel
	IsLogin bool `json:"isLogin"`
}

func Index(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	response := IndexResponse{}
	response.TemplateHeader = templates.NewHeader(ctx,
		"TipTap",
		"",
		"Tip Tap!",
		true,
		"",
		"",
	)
	userID := service.GuestUser
	a, ok := login.FromContext(ctx)
	if ok {
		userID = a.UserID
		response.IsLogin = true
	} else {
		log.Println("未ログイン")
		response.IsLogin = false
	}

	u, err := service.User.Get(ctx, userID)
	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/error", 302)
		return
	}
	response.IndexViewModel = viewmodels.ConvertIndexViewModel(u)
	templates.ExecuteTemplate(ctx, w, r, "index", response)
}
