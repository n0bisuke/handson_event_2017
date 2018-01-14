package main

import (
    "log"
    "net/http"
    "fmt"

    "github.com/line/line-bot-sdk-go/linebot"
)

func main() {
    bot, err := linebot.New(
        "87d8fa36024ab9a2672c4500b163987b",
        "zg94GDiO4treB1auiNZaGP4bg1SmSqHMQficRQGU6xGni+Qg0bKDOpm2Um5etYiCWTvEWm4zkPqO+iXAqNXBbNbjeQzwfLQV6bQbIt1hq3DEtywceJzAz0TlhwCfpjlGPEgbMU6rNfNlvetavQFwsQdB04t89/1O/w1cDnyilFU=",
    )
    if err != nil {
        log.Fatal(err)
    }

    // Setup HTTP Server for receiving requests from LINE platform
    http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
        fmt.Printf("ping\n")
        events, err := bot.ParseRequest(req)
        if err != nil {
            if err == linebot.ErrInvalidSignature {
                w.WriteHeader(400)
            } else {
                w.WriteHeader(500)
            }
            return
        }
        for _, event := range events {
            if event.Type == linebot.EventTypeMessage {
                switch message := event.Message.(type) {
                case *linebot.TextMessage:
                    fmt.Printf("%v", message)

                    leftBtn := linebot.NewMessageTemplateAction("left", "left clicked")
                    rightBtn := linebot.NewMessageTemplateAction("right", "right clicked")
                    template := linebot.NewConfirmTemplate("Hello World", leftBtn, rightBtn)
                    // messgage := linebot.NewTemplateMessage("Sorry :(, please update your app.", template)
                    
                    if _, err = bot.ReplyMessage(event.ReplyToken, linebot.NewTemplateMessage("Sorry :(, please update your app.", template)).Do(); err != nil {
                        log.Print(err)
                    }
                }
            }
        }
    })

    // This is just a sample code.
    // For actually use, you must support HTTPS by using `ListenAndServeTLS`, reverse proxy or
    if err := http.ListenAndServe(":3000", nil); err != nil {
        log.Fatal(err)
    }
}