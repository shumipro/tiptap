package viewmodels

import "github.com/shumipro/tiptap/server/domain"

type IndexViewModel struct {
	User UserViewModel `json:"user"`
}

type UserViewModel struct {
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type PerformerViewModel struct {
	PerformerID   string `json:"performer_id"`
	PerformerName string `json:"performer_name"`
	MajorID       int64  `json:"major_id"`
	MinorID       int64  `json:"minor_id"`
}

func ConvertIndexViewModel(user domain.User) IndexViewModel {
	vm := IndexViewModel{}
	vm.User.UserName = user.UserName

	return vm
}

func ConvertPerformerViewModel(performer domain.Performer) PerformerViewModel {
	vm := PerformerViewModel{}
	vm.PerformerID = performer.UserID
	vm.PerformerName = performer.UserName
	vm.MajorID = performer.MajorID
	vm.MinorID = performer.MinorID

	return vm
}
