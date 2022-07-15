import { Database, Model } from "denodb";
import Lore from "./loreModel.ts";
import log from "framework/logger.ts";

interface LoreList {
    name: string;
    title: string;
}

export default class LoreRepository {
    constructor(private db: Database) {}

    async getLore(name: string): Promise<Lore> {
        const loreValue = await Lore.select("title", "description")
            .where({ name })
            .first();
        return loreValue;
    }
    async list(): Promise<LoreList[]> {
        // @ts-ignore : poor typescript support
        return await Lore.select("name", "title").all();
    }
    async upsertLore(
        name: string,
        title: string,
        description: string,
        color: string,
        thumb: string,
        image: string
    ): Promise<Lore> {
        const loreEntry = await this.getLore(name);
        if (!loreEntry) {
            return await Lore.create({ name, title, description, color, thumb, image });
        }
        loreEntry.title = title;
        loreEntry.description = description;
        loreEntry.description = color;
        loreEntry.description = thumb;
        loreEntry.description = image;
        return await loreEntry.update();
    }
    async deleteLore(name: string): Promise<number> {
        const result = await Lore.where({ name }).delete();
        // @ts-ignore : known issue https://github.com/eveningkid/denodb/issues/350
        return result.affectedRows;
    }
}
