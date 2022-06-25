# Redbeansoup-soup
  
This is a rewriting of [redbeansoup-bot](https://github.com/LoganTann/redbeansoup-bot) with much more modules.

## Run the project in your hardware

See the dedicated file [doc: Run the project](documentation/run.md)

TL;DR : `deno run --allow-all mod.ts` or `docker-compose up` after configuration.

## Content

* framework/ : See [doc: The framework](documentation/framework.md). Custom-made framework that runs the bot, built on top of discordeno
* src/ : See [doc: The bot](documentation/framework.md). Stores all bot commands and events
* web-back/ : Contains the back-end API
* web-front/ : Contains the front-end dashboard
* database/ : Creates the MySQL Client, and Models + Repositories of all required tables.
* documentation/ : markdown files

## Why a rewrite ?

Redbeansoup-bot had different flaws that had to be fixed in this rewrite : 
- Not typescript compliant (`--no-check` is required to run)
- Unmaintainable codebase (lack of organisation in files, codes...), and no code separation between framework (discordeno-related code) and the bot in itself. Difficulty to keep a same codebase compatible with both slash commands and prefix-based message commands.
- No docker support.
- Many bugs that get patched where they should not be, and use of some hacks to get typescript barely working.


## Can I use this code to create my own discordeno bot ?

Short answer : I don't recommend it. However, feel free to take inspiration (as long as it follows the apache2 license).

Long answser : This is a personal project, to experiment with deno and deepen my knowledge in software architecture w/ Typescript.  
Since I cannot warranty I will maintain it, i don't recommend including this project as a direct dependency. 

Moreover, it's currently in development (incomplete and subject to change). Instead :
- look at other frameworks, like [oasis](https://github.com/yuzudev/oasis), which is similar and much more stable.
- Use this repository as template (copy-paste or fork), instead of importing it from the GH URL
