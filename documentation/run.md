
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
$ deno run --allow-all mod.ts
```

## Run using docker-compose

Due to a bad configuration of MySQL, you have to manually handle some steps before running this project.

If you have a suggestion to make it working easier, please let me know !

### MySQL host fix

Download and start MySql :

```sh
# db => starts MySQL only
$ docker-compose up db
```

Then log in to the container to fix the host problem :

```sh
# Host machine
$ docker exec -it <MySqlContainerHash> sh 
```

Open the MySql console : 

```
# Virtual Machine
$ mysql -p
```

Finally, configure root to accept "mysql" as host. (as long as the host in the config + env is "mysql")

```sql
CREATE USER 'root'@'mysql' IDENTIFIED WITH mysql_native_password BY '<yourRootPassword>';
```

Now we can move on...

## Run the project

Very simple.

```
# starts all containers.
$ docker-compose up
```

