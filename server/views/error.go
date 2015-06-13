package views

import (
	"log"
	"net/http"

	"github.com/guregu/kami"
	"golang.org/x/net/context"

	"github.com/shumipro/tiptap/server/errors"
	"github.com/shumipro/tiptap/server/templates"
)

func init() {
	kami.Get("/error", Error)
}

func Error(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	executeError(ctx, w, r, nil)
}

func executeError(ctx context.Context, w http.ResponseWriter, r *http.Request, err error) {
	preload := templates.NewHeader(ctx, "Error", "", "", false, "", "")

	if err != nil {
		log.Println("ERROR!", err)
		errors.SendAirbrake(ctx, err, r)
		preload.SubTitle = err.Error()
	}

	if err := templates.ExecuteTemplate(ctx, w, r, "error", preload); err != nil {
		log.Println("ERROR!", err)
		errors.SendAirbrake(ctx, err, r)
		w.Write([]byte(err.Error()))
	}
}
