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
}

func Index(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	userID := "GUEST"
	a, ok := login.FromContext(ctx)
	if ok {
		userID = a.UserID
	} else {
		log.Println("未ログイン")
	}

	u, err := service.User.Get(ctx, userID)
	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/error", 302)
		return
	}

	response := IndexResponse{}
	response.TemplateHeader = templates.NewHeader(ctx,
		"TipTap",
		"",
		"Tip Tap!",
		true,
		"",
		"",
	)
	response.IndexViewModel = viewmodels.ConvertIndexViewModel(u)

	templates.ExecuteTemplate(ctx, w, r, "index", response)
}
