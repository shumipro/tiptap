package service

import (
	"fmt"
	"time"

	"log"

	gopay "github.com/kyokomi/paypal"

	"github.com/shumipro/tiptap/server/paypal"
	"github.com/shumipro/tiptap/server/repository"
	"golang.org/x/net/context"
)

var Payout = payoutService{}

type payoutService struct {
}

// AddPayoutQueue キュー追加
func (s payoutService) AddPayoutQueue(ctx context.Context, paymentID string, payerUserID, payoutUserID string, amount string, currency string) error {
	queue := repository.PayoutQueue{}
	queue.PaymentID = paymentID
	queue.PayerUserID = payerUserID
	queue.PayoutUserID = payoutUserID
	queue.Amount = repository.Amount(amount)
	queue.Currency = repository.Currency(currency)
	queue.State = repository.PayoutStateStart
	queue.CreateAt = time.Now()
	queue.UpdateAt = time.Now()
	return repository.PayoutQueueRepository.Upsert(ctx, queue)
}

// ReadyPayoutQueue paymentIDが一致するものをすべてReadyにする
func (s payoutService) ReadyPayoutQueue(ctx context.Context, paymentID string) error {
	return repository.PayoutQueueRepository.UpdateStateByPaymentID(ctx, paymentID, repository.PayoutStateReady)
}

// TODO: パフォ−まーが自分のやつだけ処理する方式がよさそう?
// ExecutePayoutQueue 溜まってるキューを処理
func (s payoutService) ExecutePayoutQueue(ctx context.Context) error {
	client, ok := paypal.FromPayPalClient(ctx)
	if !ok {
		return fmt.Errorf("error not paypal client")
	}

	queues, err := repository.PayoutQueueRepository.FindByState(ctx, repository.PayoutStateReady)
	if err != nil {
		return err
	}

	if len(queues) == 0 {
		return nil
	}

	payOutReq := gopay.PaymentPayoutRequest{}

	for idx, queue := range queues {
		// end queue
		err = repository.PayoutQueueRepository.UpdateStateByQueueID(ctx, queue.QueueID, repository.PayoutStateEnd)
		if err != nil {
			log.Println("UpdateStateByQueueID", err)
			continue
		}

		item := gopay.PayoutItem{}
		// TODO: 本当はpayerUserIDからpayerIDかemailを取得する
		item.Receiver = "kyokomi1220dev-performer@gmail.com"
		item.Amount.Total = string(queue.Amount)
		item.Amount.Currency = string(queue.Currency)
		item.RecipientType = gopay.RECIPIENT_EMAIL

		fmt.Println(idx, item)

		payOutReq.Items = append(payOutReq.Items, item)
	}

	if err := client.Payment.Payout(true, payOutReq); err != nil {
		return err
	}

	return nil
}
