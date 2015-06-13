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
func (s payoutService) AddPayoutQueue(ctx context.Context, paymentID string, payerUserID, payoutUserID string, amount repository.Amount, currency repository.Currency) error {
	queue := repository.PayoutQueue{}
	queue.PaymentID = paymentID
	queue.PayerUserID = payerUserID
	queue.PayoutUserID = payoutUserID
	queue.Amount = amount
	queue.Currency = currency
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
