defmodule DynamicPageHandler do
  def init(_type, req, []) do
    {:ok, req, :no_state}
  end

  # http://localhost:8080/ へリクエストがきた際のレスポンスを作成する
  def handle(request, state) do
    # 文字列型を定義
    dynamic = "Dynamic"
    # リクエスト内容を定義し、上記の文字列型の変数の中身をレスポンスに含めるように記載
    # 変数の内容を使えることにより動的にページの内容を変更することができる
    { :ok, reply } = :cowboy_req.reply( 200, [{"content-type", "text/html"}], "#{dynamic} Hello World", request)
    {:ok, reply, state}
  end

  def terminate(reason, request, state) do
    :ok
  end
end