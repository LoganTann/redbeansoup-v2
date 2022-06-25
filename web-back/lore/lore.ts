import { RoutingOptions, mustExist, Response } from "aqua";
import app from "../app.ts";

import { loreRepo } from "db/mod.ts";

function buildResponse(code: number, body: object) {
    return {
        statusCode: code,
        headers: {
            "Content-Type": "application/json",
        },
        content: JSON.stringify(body),
    };
}

app.get(
    "/api/lore/:name",
    async (req) => {
        const name = req.parameters.name;
        const results = await loreRepo.readLore(name);
        if (!results.rows || results.rows.length === 0) {
            return buildResponse(404, { error: "No matches found" });
        }
        const result = results.rows[1];
        return buildResponse(404, result);
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
