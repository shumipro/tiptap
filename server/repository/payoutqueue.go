package repository

import (
	"time"

	"golang.org/x/net/context"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Amount string

type Currency string

const (
	CurrencyUSD = "USD"
)

type PayoutState string

const (
	PayoutStateStart = "START"
	PayoutStateReady = "READY"
	PayoutStateEnd   = "END"
)

type PayoutQueue struct {
	QueueID      string `bson:"_id"`
	PaymentID    string
	PayerUserID  string
	PayoutUserID string
	Amount       Amount
	Currency     Currency
	State        PayoutState
	CreateAt     time.Time
	UpdateAt     time.Time
}

type _PayoutQueueRepository struct {
}

func (_ _PayoutQueueRepository) Name() string {
	return "payout_queue"
}

var _ repository = (*_PayoutQueueRepository)(nil)

var PayoutQueueRepository = _PayoutQueueRepository{}

func (t _PayoutQueueRepository) withCollection(ctx context.Context, fn func(c *mgo.Collection)) {
	withDefaultCollection(ctx, t.Name(), fn)
}

// ----------------------------------------------

func (t _PayoutQueueRepository) FindID(ctx context.Context, payoutQueueID string) (result PayoutQueue, err error) {
	t.withCollection(ctx, func(c *mgo.Collection) {
		err = c.FindId(payoutQueueID).One(&result)
	})
	return
}

func (t _PayoutQueueRepository) FindByState(ctx context.Context, state PayoutState) (results []PayoutQueue, err error) {
	t.withCollection(ctx, func(c *mgo.Collection) {
		err = c.Find(bson.M{"state": state}).All(&results)
	})
	return
}

func (t _PayoutQueueRepository) UpdateStateByQueueID(ctx context.Context, queueID string, state PayoutState) error {
	return findAndModify(t, ctx, bson.M{"_id": queueID}, bson.M{
		"$set": bson.M{"state": state},
	})
}

func (t _PayoutQueueRepository) UpdateStateByPaymentID(ctx context.Context, paymentID string, state PayoutState) error {
	return findAndModify(t, ctx, bson.M{"paymentid": paymentID}, bson.M{
		"$set": bson.M{"state": state},
	})
}

// Upsert 登録
func (t _PayoutQueueRepository) Upsert(ctx context.Context, payoutQueue PayoutQueue) error {
	var err error
	t.withCollection(ctx, func(c *mgo.Collection) {
		var result interface{} // bson.M
		_, err = c.FindId(payoutQueue.QueueID).Apply(mgo.Change{
			Update: payoutQueue,
			Upsert: true,
		}, &result)
	})
	return err
}
