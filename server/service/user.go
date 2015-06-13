package service

import (
	"github.com/shumipro/tiptap/server/domain"
	"github.com/shumipro/tiptap/server/models"
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

	user, err := models.UsersTable.FindID(ctx, userID)
	if err != nil {
		return domain.User{}, err
	}
	u.UserID = user.ID
	u.UserName = user.Name

	return u, nil
}
