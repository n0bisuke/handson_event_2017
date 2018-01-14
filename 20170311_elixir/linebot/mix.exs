 def application do
    [
      mod: { HerokuPhoenix, [] },
      applications: [
        :phoenix, :phoenix_html, :cowboy, :logger, :gettext,
        :phoenix_ecto, :postgrex, 
        :httpoison #add
      ]
    ]
  end

  defp deps do
    [
      {:phoenix, "~> 1.1.3"},
      {:phoenix_ecto, "~> 2.0"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.3"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.9"},
      {:cowboy, "~> 1.0"},
      {:httpoison, "~> 0.8.0"}, #add
      {:poison, "~> 1.3"} #add
    ]
  end