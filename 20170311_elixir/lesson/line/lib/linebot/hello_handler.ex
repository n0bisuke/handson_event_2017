defmodule Linebot.HelloHandler do
  def init(req, opts, []) do
    headers = %{"content-type" => "text/plain"}
    body = "Hello, Cowboy Handler!!"
    IO.inspect(req.method) #GET
    # case %{status_code: 200
    if req.method === "GET" do
      IO.inspect("GET")
    else
      IO.inspect("POST")
      
      IO.inspect(opts)
      {:ok, postvals, req2} = :cowboy_req.body_qs(request)
      # {:ok, image, _} = :cowboy_req.body(req)
      # IO.inspect(image)
      # {name, req2} = :cowboy_req.binding(:fizz, req)
      # IO.inspect(name)
    end

    req2 = :cowboy_req.reply(200, headers, body, req)
    {:ok, req2, opts}
  end  
end