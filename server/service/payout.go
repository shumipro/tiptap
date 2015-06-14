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

// ExecutePayoutQueue 溜まってるキューを処理
func (s payoutService) ExecutePayoutQueue(ctx context.Context, payoutUserID string, email string) error {
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
	payOutReq.SenderBatchHeader.EmailSubject = "You have a payment"

	for idx, queue := range queues {
		if queue.PayoutUserID != payoutUserID {
			continue
		}

		// end queue
		err = repository.PayoutQueueRepository.UpdateStateByQueueID(ctx, queue.QueueID, repository.PayoutStateEnd)
		if err != nil {
			log.Println("UpdateStateByQueueID", err)
			continue
		}

		item := gopay.PayoutItem{}
		// TODO: 本当はpayerUserIDからpayerIDかemailを取得する
		item.Receiver = email
		item.Amount.Value = string(queue.Amount)
		item.Amount.Currency = string(queue.Currency)
		item.RecipientType = gopay.RECIPIENT_EMAIL
		item.Note = "Payment for recent T-Shirt delivery"
		item.SenderItemID = "A123"

		fmt.Println(idx, item)

		payOutReq.Items = append(payOutReq.Items, item)
	}

	if _, err := client.Payment.Payout(true, payOutReq); err != nil {
		return err
	}

	return nil
}
