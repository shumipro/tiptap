package service

import (
	"github.com/shumipro/tiptap/server/domain"
	"golang.org/x/net/context"
)

var Performer = performerService{}

type performerService struct {
}

func (s performerService) Get(ctx context.Context, userID string) (domain.Performer, error) {
	p := domain.Performer{}
	u, err := User.Get(ctx, userID)
	if err != nil {
		return domain.Performer{}, err
	}

	p.User = u

	// TODO] 仮 performerコレクションがいるかも
	p.MajorID = 1
	p.MinorID = 1

	return p, nil
}

func (s performerService) GetByBeacon(ctx context.Context, majorID, minorID int64) (domain.Performer, error) {
	p := domain.Performer{}
	p.UserID = "000001"
	p.UserName = "performer2"
	p.Description = "hogehogehoge"
	p.UserImageURL = "https://avatars0.githubusercontent.com/u/1456047?v=3&s=460"
	p.MajorID = majorID
	p.MinorID = minorID

	// TODO: 仮実装

	return p, nil
}
