import { mustExist } from "aqua";
import app from "../app.ts";
import { jsonResponse } from "../utils.ts";
import { loreRepo } from "db";

app.get(
    "/api/lore/:name",
    async (req) => {
        const name = req.parameters.name;
        const results = await loreRepo.getLore(name);
        if (!results) {
            return jsonResponse(404, { error: "No matches found" });
        }
        return jsonResponse(200, results);
    },
    {
        schema: {
            parameters: [
                mustExist("name"),
                (parameter) => Boolean(parameter.name?.match(/^\w+$/)),
            ],
        },
    }
);

app.put(
    "/api/lore/:name",
    async (req) => {
        const name = req.parameters.name;
        const description = req.body.description as string;
        const title = req.body.title as string;
        if (!description || !title) {
            return jsonResponse(404, {
                error: "Missing description or title",
            });
        }

        const results = await loreRepo.upsertLore(name, title, description);
        if (!results) {
            return jsonResponse(404, { error: "Upsert failed." });
        }
        return jsonResponse(200, results);
    },
    {
        schema: {
            parameters: [
                mustExist("name"),
                (parameter) => Boolean(parameter.name?.match(/^\w+$/)),
            ],
            body: [mustExist("description"), mustExist("title")],
        },
    }
);

app.delete(
    "/api/lore/:name",
    async (req) => {
        const name = req.parameters.name;
        const results = await loreRepo.deleteLore(name);
        if (results) {
            return jsonResponse(200, { success: true });
        }
        return jsonResponse(404, {
            error: "Delete failed. Maybe the entry you requested doesn't exist.",
        });
    },
    {
        schema: {
            parameters: [
                mustExist("name"),
                (parameter) => Boolean(parameter.name?.match(/^\w+$/)),
            ],
        },
    }
);
