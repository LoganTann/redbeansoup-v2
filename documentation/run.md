
# Run the project

Two ways to download :
1. Using deno and MySQL from your local configuration.
2. Use docker-compose to run the project, deno and mysql inside containers.

Deno can be downloaded here : https://deno.land/manual/getting_started/installation#download-and-install

## Config

Copy `config.example.ts` to `config.ts` and fill the parameters.

Since it contains many secret data (like your bot's token), make sure to keep it safe !!  

**Additional Docker steps** : Update env variables of the docker-compose file to make coherent with your config.


## Run using a local installation of Deno

Make sure you started your local mysql instance.

```sh
$ deno run --import-map import_map.json --allow-all mod.ts
```

## Starting only the dashboard

If you want to start the backend but not the discord bot, add the flag `--start-dashboard-only` at the end of the command.

## Run using docker-compose

redbeansoup-bot uses sqlite as database. 

```
# starts all containers.
$ docker-compose up
```

