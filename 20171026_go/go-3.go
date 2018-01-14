package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"time"
)

func input(r io.Reader) <-chan string {
	ch := make(chan string) // TODO: チャネルを作る
	go func() {
		s := bufio.NewScanner(r)
		for s.Scan() {
			ch <- s.Text() // TODO: チャネルに読み込んだ文字列を送る
		}
		close(ch) // TODO: チャネルを閉じる
	}()

	return ch // TODO: チャネルを返す
}

func main() {
	ch := input(os.Stdin)
	for {
		fmt.Print(">")
		select {
		case s := <-ch:
			fmt.Println(s)
		case <-time.After(5 * time.Second):
			fmt.Println("timeout")
			return
		}
		fmt.Println(<-ch)
	}
}
