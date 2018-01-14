defmodule Tw.HelloHandler do
  def init(req, opts) do
    headers = %{"content-type" => "text/plain"}
    # body = "Hello, Cowboy Handler!!"
    ary = ExTwitter.search("#beamlangtokyo", [count: 5])
    a = Enum.at(ary, 0)
    text = a.text
    user = a.user.screen_name
    user_image = a.user.profile_image_url_https
    IO.inspect(text)
    IO.inspect(user)
    IO.inspect(user_image)
    body = "#{text} / @#{user}"
    req2 = :cowboy_req.reply(200, headers, body, req)
    {:ok, req2, opts}
  end
end