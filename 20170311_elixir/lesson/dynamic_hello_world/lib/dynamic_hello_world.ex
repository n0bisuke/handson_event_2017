defmodule DynamicHelloWorld do
  def start(_type, _args) do
    # Cowboyのルーティング機能を定義
    dispatch = :cowboy_router.compile([
      { :_,
        [
          # http://localhost:8080/ にアクセスしてきた場合に、DynamicPageHandler を呼び出すように定義
          {"/", DynamicPageHandler, []}
      ]}
    ])
    # Cowboyを起動とともに起動内容を定義
    { :ok, _ } = :cowboy.start_http(:http, 100, [{:port, 8080}], [{ :env, [{:dispatch, dispatch}]}] )

  end
end