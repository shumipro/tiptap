package paypal

import (
	"github.com/kyokomi/paypal"
)

const (
	PayPalCancelURL = "/paypal/payment/cancel"
	PayPalReturnURL = "/paypal/payment/execute"
)

/*
paypal.Amount{
	Total:    "9.99",
	Currency: "USD",
}
*/
func (c PayPalClient) PaymentCreateReq(amount paypal.Amount, description string) paypal.PaymentCreateRequest {
	payReq := paypal.PaymentCreateRequest{}
	payReq.Intent = paypal.IntentSale
	payReq.Payer.PaymentMethod = paypal.PaymentMethodPayPal
	payReq.RedirectURLs.CancelURL = c.BaseURL + PayPalCancelURL
	payReq.RedirectURLs.ReturnURL = c.BaseURL + PayPalReturnURL
	payReq.Transactions = []paypal.Transaction{
		{
			Amount:      amount,
			Description: description,
		},
	}
	return payReq
}
