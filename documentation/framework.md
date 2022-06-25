# The framework

Handles the communication between the command's code and discord api (with discordeno between).

Currently, the developer name of this framework is just `framework`, although it's expected to be called `redbeansoup-framework` or just `redbeansoup`.

redbeansoup-framework is fully written in Typescript. It's inspired by oasis and discordjs-commando frameworks.

### Features 

> ❌ To Do;  🏃‍♂️ In progress  ; ✔ Done

- ✔ Minimal by design : **Class-based commands that prefers composition** over inheritance, using interfaces and decorators
- ✔ **Cross-platform** : runs fine in deno and docker (thus, should work in windows and linux).
- ✔ Use of a **context object** to give a shortcut to common actions and use the same codebase for both slash and messages interactions
- ✔ Custom-made file autoloader and logger, Webhook manager class
- ✔ Database support
- ❌ Custom permissions, group commands and auto-generate help
- 🏃 Built-in Back-end API server (for a dashboard)