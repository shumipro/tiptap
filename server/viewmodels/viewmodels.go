package viewmodels

import "github.com/shumipro/tiptap/server/domain"

type IndexViewModel struct {
	User UserViewModel `json:"user"`
}

type UserViewModel struct {
	Name string `json:"name"`
}

type PerformerViewModel struct {
	Name    string `json:"name"`
	MajorID int64  `json:"major_id"`
	MinorID int64  `json:"minor_id"`
}

func ConvertIndexViewModel(user domain.User) IndexViewModel {
	vm := IndexViewModel{}
	vm.User.Name = user.Name

	return vm
}

func ConvertPerformerViewModel(performer domain.Performer) PerformerViewModel {
	vm := PerformerViewModel{}
	vm.Name = performer.Name
	vm.MajorID = performer.MajorID
	vm.MinorID = performer.MinorID

	return vm
}
