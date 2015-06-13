package kami

import (
	"flag"
	"log"
	"net/http"

	"github.com/zenazn/goji/bind"
	"github.com/zenazn/goji/graceful"
)

func init() {
	bind.WithFlag()
}

// Serve starts kami with reasonable defaults.
// It works (exactly) like Goji, looking for Einhorn, the bind flag, GOJI_BIND...
func Serve() {
	if !flag.Parsed() {
		flag.Parse()
	}

	// Install our handler at the root of the standard net/http default mux.
	// This allows packages like expvar to continue working as expected.
	http.Handle("/", Handler())

	listener := bind.Default()
	log.Println("Starting kami on", listener.Addr())

	graceful.HandleSignals()
	bind.Ready()
	graceful.PreHook(func() { log.Printf("kami received signal, gracefully stopping") })
	graceful.PostHook(func() { log.Printf("kami stopped") })

	err := graceful.Serve(listener, http.DefaultServeMux)

	if err != nil {
		log.Fatal(err)
	}

	graceful.Wait()
}
