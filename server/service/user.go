package service

import (
	"github.com/shumipro/tiptap/server/domain"
	"github.com/shumipro/tiptap/server/repository"
	"golang.org/x/net/context"
)

const (
	GuestUser = "GUEST"
)

var guestUser = domain.User{
	UserID:   GuestUser,
	UserName: "GuestUser",
}

var User = userService{}

type userService struct {
}

func (t userService) Get(ctx context.Context, userID string) (domain.User, error) {
	u := domain.User{}

	if userID == GuestUser {
		return guestUser, nil
	}

	user, err := repository.UsersRepository.FindID(ctx, userID)
	if err != nil {
		return domain.User{}, err
	}
	u.UserID = user.ID
	u.UserName = user.Name
	u.UserImageURL = user.IconImageURL()
	u.Description = user.TwitterUser.Description

	return u, nil
}
