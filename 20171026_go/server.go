package main

import (
	"net/http"
	"text/template"
)

type Page struct { // テンプレート展開用のデータ構造
	Title string
	Count int
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	// msg := r.FormValue("msg")
	// fmt.Fprintln(w, "hello", r.FormValue("msg"))
	// page := Page{"Hello World.", 1}                                           // テンプレート用のデータ
	tmpl, err := template.New("sign").Parse("<html><body>{{msg}}</body><html>") // テンプレート文字列
	if err != nil {
		panic(err)
	}
	tmpl.Execute(w, r.FormValue("msg"))
}

func main() {
	http.HandleFunc("/", viewHandler) // hello
	http.ListenAndServe(":8080", nil)
}
