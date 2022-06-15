# Redbeansoup-soup

> *Don't blame me for the name...*

This is an attempt to create a discord bot framework built on top of discordeno, while rewriting redbeansoup-bot.

This is a personnal project. Since I cannot warranty I will maintain it, it don't recommand to include this project as a dependancy.

Instead, look at other frameworks (like [oasis](https://github.com/yuzudev/oasis)) or just take inspiration + copy paste from this repository.

Like most kagescan-related projects, source code is under the Apache2 license.

## How to run ?

As long as you have the right tools, you can run the bot in a single command !

### Prerequisities

1. Copy `config.example.ts` to `config.ts` and fill the parameters. Make sure to make this file secret !!
2. Install

### Using deno / pm2

The bot uses deno as runtime environment. All you need is to install the binary at https://deno.land/manual/getting_started/installation#download-and-install

```sh
# Only in one command !
$ deno run --allow-all mod.ts
```

When it's ready to production, you may want to use a deamon to run the bot in background. This project supports pm2.

*pm2 to be added.*

### Using docker-compose / portainer

The bot can run in a docker container. Technically, the compose script starts the official deno image + additional dependancies, and run the local source-code from the volume. Therefore, no docker image is providen.

```sh
# Again, only in one commmand
$ docker-compose up
```

You way want to use portainer to start and manage the container.