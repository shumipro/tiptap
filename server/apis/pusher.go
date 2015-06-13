package apis

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/guregu/kami"
	"github.com/pusher/pusher-http-go"
	"github.com/shumipro/tiptap/server/login"
	"github.com/shumipro/tiptap/server/service"
	"golang.org/x/net/context"
)

const (
	PusherAppId  = "124741"
	PusherKey    = "21ca65f345ffaeacb59b"
	PusherSecret = "1ec82449e6ab0cf6e23d"
)

func init() {
	kami.Post("/api/pusher_comment", PusherComment)
	kami.Post("/api/pusher_pay", PusherPay)
}

type PusherCommentRequest struct {
	Comment     string `json:"comment"`
	PerformerID string `json:"performer_id"`
}

type PusherPayRequest struct {
	Currency    string `json:"currency"`
	Amount      string `json:"amount"`
	PerformerID string `json:"performer_id"`
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
		AppId:  PusherAppId,
		Key:    PusherKey,
		Secret: PusherSecret,
	}

	result := map[string]string{"comment": commentReq.Comment}

	// pusher trigger
	client.Trigger(commentReq.PerformerID, "comment", result)

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

	pushClient := pusher.Client{
		AppId:  PusherAppId,
		Key:    PusherKey,
		Secret: PusherSecret,
	}

	userID := service.GuestUser
	a, ok := login.FromContext(ctx)
	if ok {
		userID = a.UserID
	}
	user, err := service.User.Get(ctx, userID)
	if err != nil {
		log.Println("ERROR! json parse", err)
		renderer.JSON(w, 400, err.Error())
		return
	}

	result := map[string]string{
		"amount":   payReq.Amount,
		"currency": payReq.Currency,
		"userId":   user.UserID,
		"userName": user.UserName,
		"userIcon": user.UserImageURL,
	}

	// pusher trigger
	pushClient.Trigger(payReq.PerformerID, "pay", result)

	renderer.JSON(w, 200, result)
}
