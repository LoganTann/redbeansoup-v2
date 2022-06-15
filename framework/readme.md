## soup-framework

This is a discord bot framework written on top of Discordeno. Therefore, it's totally possible to access discordeno's legacy API.

The framework is heavily inspired by the [Oasis Framework](https://github.com/yuzudev/oasis). Except this is a personal project, and is not intended to be maintained.

**Naming** : Classes are in camelCase, and classes interfaces are prefixed by I

### files

* **bot.ts** : Declare the bot instance and load discordeno plugins; Construct the final bot client
* **logger.ts** : provide logging functions, to replace console.log
* **fileloader.ts** : used to auto-load the bot's code. Auto-loading strategy is defined here.
* **decorators/Command.ts** : Decorator to register and load the command
* **types/ICommand** : Interface to define required fields to create a bot command 