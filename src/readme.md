## redbeansoup-bot

This is an attempt to rewrite redbeansoup-bot using the soup framework.

### folders

#### Commands

Contains the commands of the bot

The framework auto-loads the files located at `src/commands/<commandName>/<commandName>.ts`.  
This behavior takes inspiration from the Salesforce Lightning Web Component front-end framework.

**Naming** :
* Any command should be declared in a file like this `src/commands/<commandName>/<commandName>.ts`.
* You are free to add more files in the folder of the command, but it won't be autoloaded.
* All files and folders should be camelCase.

#### Events

Declare here your events, like `ready` or `interactionCreate`.

The framework loads all `.ts` files of this folder.

**Naming** :
* events entrypoint files should be a gateway name in camelCase. (`<event>.ts`)
* Additional code related to the event should be written in a separate file inside a separate folder (like `<event>/<anyFile>.ts`)
  

#### Types

Declare here your typescript interfaces or typedefs. This folder is not auto-imported.

**Naming** : 
* camelCase, split types in packages if possible
* class interfaces should be prefixed by I

#### Utils

Store here utility functions. This folder is not auto-imported.

**Naming** : 
* camelCase, split files in packages if possible
