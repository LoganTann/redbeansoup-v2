import { Database, Model } from "denodb";
import Lore from "./loreModel.ts";

export default class LoreRepository {
    constructor(private db: Database) {}

    async getLore(name: string): Promise<string | undefined> {
        const loreValue = await Lore.select("description")
            .where({ name })
            .first();
        return loreValue.description?.toString();
    }
    async createLore(name: string, description: string): Promise<Model> {
        return Lore.create({ name, description });
    }
}
