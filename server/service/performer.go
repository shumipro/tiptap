package service

import "github.com/shumipro/tiptap/server/domain"

var Performer = performerService{}

type performerService struct {
}

func (s performerService) Get(userID int64) (domain.Performer, error) {
	p := domain.Performer{}
	p.Name = "performer1"
	p.MajorID = 1
	p.MinorID = 1

	// TODO: 仮実装

	return p, nil
}

func (s performerService) GetByBeacon(majorID, minorID int64) (domain.Performer, error) {
	p := domain.Performer{}
	p.Name = "performer2"
	p.MajorID = majorID
	p.MinorID = minorID

	// TODO: 仮実装

	return p, nil
}
