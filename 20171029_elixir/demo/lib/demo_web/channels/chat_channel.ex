defmodule DemoWeb.ChatChannel do
    use DemoWeb, :channel # チャネル関連の機能を使うための宣言
    # チャネルを扱うための関数を実装(後ほど説明)

    def join("chat:lobby", payload, socket) do
        Process.flag(:trap_exit, true) # 異常時にプロセスが死なない為の設定
        {:ok, socket}
    end

    def handle_in("new_msg", payload, socket) do
        broadcast! socket, "new_msg", payload
        {:reply, {:ok, payload}, socket}
    end

    def handle_in("signaling", payload, socket) do
        broadcast! socket, "signaling", payload
        {:reply, {:ok, payload}, socket}
    end

    def handle_in("ping", payload, socket) do
        {:reply, {:ok, payload}, socket}
    end
    
end