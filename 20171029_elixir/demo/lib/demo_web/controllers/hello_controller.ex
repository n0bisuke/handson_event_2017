# lib/demo_web/controllers/hello_controller.ex
defmodule DemoWeb.HelloController do
    use DemoWeb, :controller # コントローラー関連の機能を使うための指定
  
    def hello(conn, params) do
      # viewの表示の処理(後ほど実装)
      name = params["name"]
      render(conn, "hello.html", %{who: name})
    end
  end 