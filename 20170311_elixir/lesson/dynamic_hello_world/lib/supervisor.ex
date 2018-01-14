defmodule DynamicHelloWorld.Supervisor do
  use Supervisor

  def start_link(_) do
    {:ok, sup} = Supervisor.start_link(__MODULE__, [], name: :supervisor)
  end

  # supervisorモジュールを起動する際に init/1 を渡す必要がある
  def init(_) do
    processes = []
    # Supervisorの戦略を決定します。
    # one_for_oneは自分自身がダメになったら他人に影響されず
    # 自分自身を再起動するという戦略です。
    {:ok, {{:one_for_one, 10, 10}, processes}}
  end

end