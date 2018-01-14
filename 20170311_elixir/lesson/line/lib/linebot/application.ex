defmodule Linebot.Application do
  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    # Define workers and child supervisors to be supervised
    children = [
      # Starts a worker by calling: Linebot.Worker.start_link(arg1, arg2, arg3)
      # worker(Linebot.Worker, [arg1, arg2, arg3]),
      worker(__MODULE__, [], function: :start_cowboy)
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Linebot.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # cowboyの起動処理
  def start_cowboy do
    routes = [
      {"/", Linebot.HelloHandler, []} # ココ! / にアクセスするとDemo.HelloHandlerが初期値``[]``の処理が走る
    ]

    dispatch = :cowboy_router.compile([{:_, routes}])
    opts = [{:port, 8801}]
    env = %{dispatch: dispatch}
    
    {:ok, _pid} = :cowboy.start_clear(:http, 10, opts, %{env: env})
  end
end
