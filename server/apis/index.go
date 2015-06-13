package apis

import (
	"log"
	"net/http"

	"github.com/guregu/kami"
	"golang.org/x/net/context"

	"github.com/shumipro/tiptap/server/service"
	vm "github.com/shumipro/tiptap/server/viewmodels"
)

func init() {
	kami.Get("/api/index", Index)
}

func Index(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	userID := int64(1)
	u, err := service.User.Get(userID)
	if err != nil {
		log.Println(err)
		renderer.JSON(w, 400, err.Error())
		return
	}
	response := vm.ConvertIndexViewModel(u)
	renderer.JSON(w, 200, response)
}
