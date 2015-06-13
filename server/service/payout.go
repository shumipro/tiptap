package service

import (
	"fmt"
	"time"

	"log"

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
	queues, err := repository.PayoutQueueRepository.FindByState(ctx, repository.PayoutStateReady)
	if err != nil {
		return err
	}

	for idx, queue := range queues {
		// TODO: payout API
		fmt.Println("payout API")

		fmt.Println(idx, queue)

		// end queue
		err = repository.PayoutQueueRepository.UpdateStateByQueueID(ctx, queue.QueueID, repository.PayoutStateEnd)
		if err != nil {
			log.Println("UpdateStateByQueueID", err)
		}
	}

	return nil
}
