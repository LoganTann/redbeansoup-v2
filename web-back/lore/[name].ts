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
            return jsonResponse(404, { error: "Not found", message : `Not found, no match for ${name} was found`, statusCode: "404", timestamp: new Date().toISOString()});
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
        const color = req.body.color as string;
        const image = req.body.image as string;
        const thumb = req.body.thumb as string;
        if (!description || !title) {
            return jsonResponse(400, {
                error: "Bad request",
                message: "Malformed request, missing description or title",
                statusCode: "400",
                timestamp: new Date().toISOString()
            });
        }

        const results = await loreRepo.upsertLore(name, title, description, color, thumb, image);
        if (!results) {
            return jsonResponse(400, { error: "Bad request.", message: "Upsert failed, couldn't update or add the lore.", statusCode: 400, timestamp: new Date().toISOString()});
        }
        return jsonResponse(200, results); // 201 seems to be a better response code for a successful PUT but 200 is ok if lore already exists
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
            return jsonResponse(200, { success: true }); // 204 without body (no content). Body is just a repeat of status code
        }
        return jsonResponse(404, {
            error: "Not found",
            message: "Delete failed. The entry you requested doesn't exist.",
            statusCode: 404,
            timestamp: new Date().toISOString()
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
