import app from "../app.ts";
import { jsonResponse } from "../utils.ts";
import { loreRepo } from "db";

/**
 * List all lores (name, title).
 */
app.get("/api/lore", async () => {
    const results = await loreRepo.list();
    if (!results) {
        return jsonResponse(404, { error: "No results" });
    }
    return jsonResponse(200, results);
});
