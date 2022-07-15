import app from "../app.ts";
import { jsonResponse } from "../utils.ts";
import { loreRepo } from "db";

/**
 * List all lores (name, title).
 */
app.get("/api/lore", async () => {
    const results = await loreRepo.list();
    if (!results) {
        return jsonResponse(404, { error: "No results" }); // Not sure that not having any lore yet is an error. 204 is probably better.
    }
    return jsonResponse(200, results);
});
