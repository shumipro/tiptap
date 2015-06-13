package viewmodels

import "github.com/shumipro/tiptap/server/domain"

type IndexViewModel struct {
	User UserViewModel `json:"user"`
}

type UserViewModel struct {
	UserID       string `json:"user_id"`
	UserName     string `json:"user_name"`
	UserImageURL string `json:"user_image_url"`
	Description  string `json:"description"`
}

type PerformerViewModel struct {
	PerformerID       string `json:"performer_id"`
	PerformerName     string `json:"performer_name"`
	PerformerImageURL string `json:"performer_image_url"`
	Description       string `json:"description"`
	MajorID           int64  `json:"major_id"`
	MinorID           int64  `json:"minor_id"`
}

func ConvertIndexViewModel(user domain.User) IndexViewModel {
	vm := IndexViewModel{}
	vm.User.UserID = user.UserID
	vm.User.UserName = user.UserName
	vm.User.Description = user.Description
	vm.User.UserImageURL = user.UserImageURL

	return vm
}

func ConvertPerformerViewModel(performer domain.Performer) PerformerViewModel {
	vm := PerformerViewModel{}
	vm.PerformerID = performer.UserID
	vm.PerformerName = performer.UserName
	vm.Description = performer.Description
	vm.PerformerImageURL = performer.UserImageURL
	vm.MajorID = performer.MajorID
	vm.MinorID = performer.MinorID

	return vm
}
