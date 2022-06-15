## soup-framework

This is a discord bot framework written on top of Discordeno. Therefore, it's totally possible to access discordeno's legacy API.

The framework is heavily inspired by the [Oasis Framework](https://github.com/yuzudev/oasis). Except this is a personal project, and is not intended to be maintained.


### files

* **bot.ts** : Declare the bot instance and load discordeno plugins
* **logger.ts** : provide logging functions, to replace console.log
* **fileloader.ts** : used to auto-load the bot's code. Auto-loading strategy is defined here.