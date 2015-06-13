package service

import (
	"github.com/shumipro/tiptap/server/domain"
	"github.com/shumipro/tiptap/server/repository"
	"golang.org/x/net/context"
)

var Performer = performerService{}

type performerService struct {
}

func (s performerService) Get(ctx context.Context, userID string) (domain.Performer, error) {
	p := domain.Performer{}
	user, err := repository.UsersRepository.FindID(ctx, userID)
	if err != nil {
		return domain.Performer{}, err
	}
	p.UserID = user.ID
	p.UserName = user.Name
	p.UserImageURL = user.IconImageURL()
	p.Description = user.TwitterUser.Description
	p.MajorID = user.Beacon.MajorID
	p.MinorID = user.Beacon.MinorID

	return p, nil
}

func (s performerService) GetByBeacon(ctx context.Context, majorID, minorID int64) (domain.Performer, error) {
	p := domain.Performer{}
	user, err := repository.UsersRepository.FindByBeacon(ctx, majorID, minorID)
	if err != nil {
		return domain.Performer{}, err
	}
	p.UserID = user.ID
	p.UserName = user.Name
	p.UserImageURL = user.IconImageURL()
	p.Description = user.TwitterUser.Description
	p.MajorID = user.Beacon.MajorID
	p.MinorID = user.Beacon.MinorID

	return p, nil
}
