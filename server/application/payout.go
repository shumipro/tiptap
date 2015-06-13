package application

import (
	"log"
	"time"

	"github.com/shumipro/tiptap/server/service"
	"golang.org/x/net/context"
)

func RefreshPayoutQueue(ctx context.Context) {
	log.Println("init refresh payout queue")

	go func() {
		defer recover()

		for {
			log.Println("execute refresh payout queue")

			if err := service.Payout.ExecutePayoutQueue(ctx); err != nil {
				log.Println(err)
			}
			time.Sleep(1 * time.Minute)
		}
	}()
}
