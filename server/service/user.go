package service

import "github.com/shumipro/tiptap/server/domain"

var User = userService{}

type userService struct {
}

func (t userService) Get(userID int64) (domain.User, error) {
	u := domain.User{}

	// TODO: userテーブル的なやつ検索

	u.UserName = "hogeUser"

	return u, nil
}
