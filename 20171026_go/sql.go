package main

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// ドライバ名, 接続文字列
	db, err := sql.Open("sqlite3", "database.db")
	rows, err := db.Query("SELECT * FROM personal WHERE age = ?", 10)
	if err != nil { /* エラー処理 */
	}
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			/* エラー処理 */
		}
		fmt.Printf("%s is\n", name)
	}
	if err := rows.Err(); err != nil { /* エラー処理 */
	}

}
