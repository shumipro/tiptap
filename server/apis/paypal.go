package apis

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/guregu/kami"
	gopay "github.com/kyokomi/paypal"
	"github.com/shumipro/tiptap/server/login"
	"github.com/shumipro/tiptap/server/paypal"
	"github.com/shumipro/tiptap/server/service"
	"golang.org/x/net/context"
)

func init() {
	kami.Post("/api/payment/create", PaymentCreate)
	kami.Get("/payment/list", PaymentList)
	kami.Get("/payment/done", PaymentDone)
	kami.Get(paypal.PayPalReturnURL, PayPalPaymentExecute)
	kami.Get(paypal.PayPalCancelURL, PayPalPaymentCancel)
}

type PaymentData struct {
	Payments []PaymentItem `json:"payments"`
	Total    string        `json:"total"`
}

type PaymentItem struct {
	Currency    string `json:"currency"`
	Amount      string `json:"amount"`
	PerformerID string `json:"performer_id"`
}

func PaymentList(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	client, ok := paypal.FromPayPalClient(ctx)
	if !ok {
		renderer.JSON(w, 400, "not found paypal client")
		return
	}

	res, err := client.Payment.List()
	if err != nil {
		renderer.JSON(w, 400, err.Error())
		return
	}

	renderer.JSON(w, 200, res)
}

func PaymentCreate(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("ERROR!", err)
		renderer.JSON(w, 400, err.Error())
		return
	}

	// convert request params to struct
	var payData PaymentData
	if err := json.Unmarshal(data, &payData); err != nil {
		log.Println("ERROR! json parse", err)
		renderer.JSON(w, 400, err.Error())
		return
	}

	a, ok := login.FromContext(ctx)
	if !ok {
		renderer.JSON(w, 401, "not login user")
		return
	}

	client, ok := paypal.FromPayPalClient(ctx)
	if !ok {
		renderer.JSON(w, 400, "not found paypal client")
		return
	}

	// totalの支払いだけシステムへ行う
	fmt.Println(string(payData.Total))
	payReq := client.PaymentCreateReq(gopay.Amount{
		Total:    payData.Total,
		Currency: "USD",
	}, "Total Payment")

	payRes, err := client.Payment.Create(payReq)
	if err != nil {
		renderer.JSON(w, 400, err.Error())
		return
	}

	// mongoにpayoutキューとしてストアしておく
	for _, p := range payData.Payments {
		payoutUserID := p.PerformerID
		err = service.Payout.AddPayoutQueue(ctx, payRes.ID, a.UserID, payoutUserID, p.Amount, p.Currency)
		if err != nil {
			// TODO: 辛いけど手オペ対応しないといけない airbrakeする
			log.Println(err)
		}
	}

	approvalURL := payRes.LinkByRel(gopay.RelApprovalURL).URL

	fmt.Println(string(approvalURL))

	result := map[string]string{"approvalURL": approvalURL}

	renderer.JSON(w, 200, result)
}

func PayPalPaymentExecute(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	client, ok := paypal.FromPayPalClient(ctx)
	if !ok {
		renderer.JSON(w, 400, "not found paypal client")
		return
	}

	payerID := r.FormValue("PayerID")
	paymentID := r.FormValue("paymentId")

	req := gopay.PaymentExecuteRequest{}
	req.PayerID = payerID
	if err := client.Payment.Execute(paymentID, req); err != nil {
		renderer.JSON(w, 400, err.Error())
		return
	}

	// paymentIDでqueueを更新
	if err := service.Payout.ReadyPayoutQueue(ctx, paymentID); err != nil {
		// TODO: 手オペになる airbrakeする
		renderer.JSON(w, 400, err.Error())
		return
	}

	http.Redirect(w, r, "/payment/done", 302)
}

func PayPalPaymentCancel(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.Form)
	fmt.Println(r.Header)
	fmt.Println(r.Cookies())
}

func PaymentDone(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.Form)
	fmt.Println(r.Header)
	fmt.Println(r.Cookies())

	// call custom scheme
	w.Write([]byte("<html><script>location.href='tiptap://https://bigtiptap-battlehack.herokuapp.com/';</script></html>"))
	// http.Redirect(w, r, "tiptap://https://bigtiptap-battlehack.herokuapp.com/", 302)
}
