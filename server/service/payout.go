package service

import (
	"time"

	"fmt"

	"github.com/shumipro/tiptap/server/repository"
	"golang.org/x/net/context"
)

var Payout = payoutService{}

type payoutService struct {
}

// 溜まってるキューを処理
func (s payoutService) ExecutePayoutQueue(ctx context.Context) error {
	queues, err := repository.PayoutQueueRepository.FindByState(ctx, repository.PayoutStateStart)
	if err != nil {
		return err
	}

	for idx, queue := range queues {
		// TODO: payout API
		fmt.Println("payout API")

		fmt.Println(idx, queue)

		// TODO: delete queue
		fmt.Println("delete queue")
	}

	return nil
}

// キュー追加
func (s payoutService) AddPayoutQueue(ctx context.Context, payerUserID, payoutUserID string, amount repository.Amount, currency repository.Currency) error {
	queue := repository.PayoutQueue{}
	queue.PayerUserID = payerUserID
	queue.PayoutUserID = payoutUserID
	queue.Amount = amount
	queue.Currency = currency
	queue.State = repository.PayoutStateEnd
	queue.CreateAt = time.Now()
	queue.UpdateAt = time.Now()
	return repository.PayoutQueueRepository.Upsert(ctx, queue)
}


// TODO: 使わないかも?
func (s payoutService) EndPayoutQueue(ctx context.Context, payoutQueueID string) error {
	queue, err := repository.PayoutQueueRepository.FindID(ctx, payoutQueueID)
	if err != nil {
		return err
	}

	queue.State = repository.PayoutStateEnd
	return repository.PayoutQueueRepository.Upsert(ctx, queue)
}
