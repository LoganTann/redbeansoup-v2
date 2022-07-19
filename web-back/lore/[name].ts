import { mustExist } from "aqua";
import app from "../app.ts";
import { jsonResponse, isValidUrl } from "../utils.ts";
import { loreRepo } from "db";

const DEFAULT_COLOR = 1752220;

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
        const color = req.body.color as number ?? DEFAULT_COLOR;
        const image = req.body.image as string ?? "";
        const thumb = req.body.thumb as string ?? "";
        if (!description || !title) {
            return jsonResponse(400, {
                error: "Bad request",
                message: "Malformed request, missing description or title",
                statusCode: "400",
                timestamp: new Date().toISOString()
            });
        }
        if (!isValidUrl(image) || !isValidUrl(thumb)) {
            return jsonResponse(400, {
                error: "Bad request",
                message: "Malformed request, invalid image or thumb url",
                statusCode: "400",
                timestamp: new Date().toISOString()
            });
        }

        const results = await loreRepo.upsertLore(name, title, description, color, thumb, image);
        if (!results) {
            return jsonResponse(400, { error: "Bad request.", message: "Upsert failed, couldn't update or add the lore.", statusCode: 400, timestamp: new Date().toISOString()});
        }
        return jsonResponse(results["title"] ? 200 : 201, undefined);
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
            return jsonResponse(204, undefined);
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
