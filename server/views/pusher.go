package views

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/guregu/kami"
	"github.com/shumipro/tiptap/server/templates"
	"golang.org/x/net/context"

	"github.com/pusher/pusher-http-go"
)

func init() {
	kami.Get("/pusher_subscribe", PusherSubscribe)
	kami.Get("/pusher_publish", PusherPublish)
	kami.Post("/pusher_comment", PusherComment)
	kami.Post("/pusher_pay", PusherPay)
}

func PusherSubscribe(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	preload := templates.NewHeader(ctx,
		"TipTap subscribe ",
		"",
		"Tip Tap subscribe!",
		true,
		"",
		"",
	)
	templates.ExecuteTemplate(ctx, w, r, "pusher_subscribe", preload)
}

func PusherPublish(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	client := pusher.Client{
		AppId:  "124741",
		Key:    "21ca65f345ffaeacb59b",
		Secret: "1ec82449e6ab0cf6e23d",
	}

	data := map[string]string{"message": "hello world"}

	client.Trigger("test_channel", "my_event", data)

	preload := templates.NewHeader(ctx,
		"TipTap publish ",
		"",
		"Tip Tap publish!",
		true,
		"",
		"",
	)
	templates.ExecuteTemplate(ctx, w, r, "pusher_publish", preload)
}

type PusherCommentRequest struct {
	Comment string `json:"comment"`
}

type PusherPayRequest struct {
	Price string `json:"price"`
}

func PusherComment(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("ERROR!", err)
		renderer.JSON(w, 400, err.Error())
		return
	}

	// convert request params to struct
	var commentReq PusherCommentRequest
	if err := json.Unmarshal(data, &commentReq); err != nil {
		log.Println("ERROR! json parse", err)
		renderer.JSON(w, 400, err.Error())
		return
	}

	client := pusher.Client{
		AppId:  "124741",
		Key:    "21ca65f345ffaeacb59b",
		Secret: "1ec82449e6ab0cf6e23d",
	}

	result := map[string]string{"comment": commentReq.Comment}

	client.Trigger("performer_channel_00001", "comment", result)

	renderer.JSON(w, 200, result)
}

func PusherPay(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("ERROR!", err)
		renderer.JSON(w, 400, err.Error())
		return
	}

	// convert request params to struct
	var payReq PusherPayRequest
	if err := json.Unmarshal(data, &payReq); err != nil {
		log.Println("ERROR! json parse", err)
		renderer.JSON(w, 400, err.Error())
		return
	}

	client := pusher.Client{
		AppId:  "124741",
		Key:    "21ca65f345ffaeacb59b",
		Secret: "1ec82449e6ab0cf6e23d",
	}

	result := map[string]string{"price": payReq.Price}

	client.Trigger("performer_channel_00001", "pay", result)

	renderer.JSON(w, 200, result)
}
