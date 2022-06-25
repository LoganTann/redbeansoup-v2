# Redbeansoup-soup

<table><tbody><tr><td><p align="center">Table of contents : </p>

- [Context](#context) :
- [Features](#features) :
  - [Framework](#framework)
  - [Bot](#bot)
- [How to run](#how-to-run)
  - [Prerequisites](#prerequisites)
  - [Deno in your local computer](#deno-in-your-local-computer)
  - [Deno using docker-compose](#deno-using-docker-compose)

</td></tr></tbody></table>
  
This is an attempt to create a discord bot framework built on top of discordeno, while rewriting [redbeansoup-bot](https://github.com/LoganTann/redbeansoup-bot).

## Context

Indeed, redbeansoup-bot was created only to be a private bot for two different servers, but features happened to be interesting for a use outside of these servers. Moreover, redbeansoup-bot had different flaws that haves to be fixed in this rewrite : 
- Not typescript compliant (`--no-check` is required to run)
- Unmaintainable codebase (lack of organisation in files, codes...), and no code separation between framework (discordeno-related code) and the bot in itself. Difficulty to keep a same codebase compatible with both slash commands and prefix-based message commands.
- No docker support.
- Many bugs that get patched where they should not be, and use of some hacks to get typescript barely working.


> Can I use this code to create my own discordeno bot ?

This is a personal project, to experiment with deno and deepen my knowledge in software architecture w/ Typescript.  
Since I cannot warranty I will maintain it, i don't recommend including this project as a direct dependency. 

Moreover, it's currently in development (incomplete and subject to change). Instead :
- look at other frameworks, like [oasis](https://github.com/yuzudev/oasis), which is similar and much more stable.
- Use this repository as template (copy-paste or fork), instead of importing it from the GH URL

Like most kagescan-related projects as of 2021, source code is under the Apache2 license.

## Features

Status : 
- ❌ To Do
- 🏃‍♂️ In progress
- ✔ Done

### Framework

The framework that runs the bot is located in the `framework` folder.

Currently, the developer name of this framework is just `framework`, although it's expected to be called `redbeansoup-framework` or just `redbeansoup`.

redbeansoup-framework is fully written in Typescript. It's inspired by oasis and discordjs-commando frameworks.

- ✔ Minimal by design : **Class-based commands that prefers composition** over inheritance, using interfaces and decorators
- ✔ **Cross-platform** runs fine in deno and docker (should work in windows and linux).
- ✔ Use of a **context object** to give a shortcut to common actions and use the same codebase for both slash and messages interactions
- ✔ Custom-made file autoloader and logger, Webhook manager class
- 🏃‍ Database support
- ❌ Custom permissions, group commands and auto-generate help
- ❌ Built-in Back-end API server (for a dashboard)

### Bot

The bot is multipurpose and commands are sorted in group of usage / server. Its source code is located in the `src/` folder

OpenAI Beta : 
- ✔ `$momo` : Momo answers all your requests, thanks to the magic of OpenAI. She's especially good at text completion and summarization.
- ❌ `$ayano` : Ayano is probably better than Momo, because she acts like a real person, remembering the context of her last 10 interactions.
- ✔ `$ai (status)` : check your OpenAI token's usage and remaining credit.

IUT de Paris : 
- ❌ `$edt` : "Descalendrier pour Discord" - Private command. request the scheudule of the IT dept.
- ❌ `$meteo` : "Descanicule pour Discord" - Gets the meteo of Paris

Kagerou Project FR:
- ✔ wholesome commands : `$blush`, `$cry`, `$handhold`, `$highfive`, `$pat`, `$hug`, `$punch`, `$shut`, `$slap`
- ✔ stickers feature.

## How to run

As long as you have the right tools, you can run the bot in a single command !

### Prerequisites

1. Copy `config.example.ts` to `config.ts` and fill the parameters. Since it contains many secret data (like your bot's token), make sure to keep it safe !!
2. Install ...

### Deno in your local computer

The bot uses deno as runtime environment. All you need is to install the binary at https://deno.land/manual/getting_started/installation#download-and-install

Then, run the bot using :

```sh
$ deno run --allow-all mod.ts
```

When it's ready for production, you may want to run in background using pm2.

> *pm2 support to be added.*

### Deno using docker-compose

If you don't want to pollute your local setup with deno and other deps, but you do have docker installed, you can run the bot in a docker container using the docker-compose script :

```sh
$ docker-compose up
```

Since the bot is currently in development, the script only starts the official deno image + additional dependencies, maps the source code into a volume and run it. Therefore, no docker image have been built, and the container will have access to this folder's local filesystem.

When it's ready for production, you may want to run in background and monitor using portainer.

> *portainer support to be added (?)*
