package views

import (
	"net/http"

	"github.com/guregu/kami"
	"github.com/shumipro/tiptap/server/templates"
	"golang.org/x/net/context"
)

func init() {
	kami.Get("/", Index)
}

func Index(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	preload := templates.NewHeader(ctx,
		"TipTap",
		"",
		"Tip Tap!",
		true,
		"",
		"",
	)
	templates.ExecuteTemplate(ctx, w, r, "index", preload)
}
