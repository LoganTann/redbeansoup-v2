# The dashboard

## Back-end

The back-end uses Aqua to create the server, and denodb as ORM. The DBMS used is SQlite.

I use [Insomnia](https://insomnia.rest/) to make requests to the server during the development.

I export my project file occasionnaly in the [Insomnnia.json](Insomnia.json) file; so import it to quickly try and test all routes.

To disable the discord bot startup (ie. start only aqua), add the `--start-dashboard-only` flag.

```powershell
$ deno run --import-map import_map.json --allow-all mod.ts --start-dashboard-only
```

## Front-end

In progress.
