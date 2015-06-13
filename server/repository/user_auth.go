package repository

import (
	"golang.org/x/net/context"
	"gopkg.in/mgo.v2"
)

type UserAuth struct {
	UserID       string `bson:"_id"      json:"userId"`
	TwitterToken string `                json:"twitterToken"`
}

type _UserAuthRepository struct {
}

func (_ _UserAuthRepository) Name() string {
	return "user_auth"
}

var _ repository = (*_UserAuthRepository)(nil)

var UserAuthRepository = _UserAuthRepository{}

func (t _UserAuthRepository) withCollection(ctx context.Context, fn func(c *mgo.Collection)) {
	withDefaultCollection(ctx, t.Name(), fn)
}

// ----------------------------------------------

func (t _UserAuthRepository) FindID(ctx context.Context, userID string) (result UserAuth, err error) {
	t.withCollection(ctx, func(c *mgo.Collection) {
		err = c.FindId(userID).One(&result)
	})
	return
}

func (t _UserAuthRepository) Upsert(ctx context.Context, user UserAuth) error {
	var err error
	t.withCollection(ctx, func(c *mgo.Collection) {
		var result interface{} // bson.M
		_, err = c.FindId(user.UserID).Apply(mgo.Change{
			Update: user,
			Upsert: true,
		}, &result)
	})
	return err
}
