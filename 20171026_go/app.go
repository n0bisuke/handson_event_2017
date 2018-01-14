package main

import (
	"fmt"
	"log"

	"github.com/PuerkitoBio/goquery"
)

func fetch() {
	doc, err := goquery.NewDocument("https://golang.org")
	if err != nil {
		log.Fatal(err)
	}

	doc.Find("a").Each(func(i int, s *goquery.Selection) {
		if href, ok := s.Attr("href"); ok {
			fmt.Println(href)
		}
	})
}

func main() {
	fetch()
}
