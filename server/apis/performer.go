package apis

import (
	"log"
	"net/http"

	"github.com/guregu/kami"
	"golang.org/x/net/context"

	"strconv"

	"github.com/shumipro/tiptap/server/service"
	vm "github.com/shumipro/tiptap/server/viewmodels"
)

func init() {
	kami.Get("/api/performer", performerHandler)
}

func performerHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	majorID, _ := strconv.ParseInt(r.FormValue("major_id"), 10, 64)
	minorID, _ := strconv.ParseInt(r.FormValue("minor_id"), 10, 64)

	p, err := service.Performer.GetByBeacon(majorID, minorID)
	if err != nil {
		log.Println(err)
		return
	}
	response := vm.ConvertPerformerViewModel(p)
	renderer.JSON(w, 200, response)
}
