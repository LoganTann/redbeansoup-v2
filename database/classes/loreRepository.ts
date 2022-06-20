import { Database, Model } from "denodb";
import Lore from "./loreModel.ts";

export default class LoreRepository {
    constructor(private db: Database) {}

    async getLore(guildId: string, key: string): Promise<string | undefined> {
        const loreValue = await Lore.select("value")
            .where({ key: key, ownerId: guildId })
            .first();
        return loreValue.value?.toString();
    }
    async createLore(
        guildId: string,
        key: string,
        value: string
    ): Promise<Model> {
        return Lore.create({ key, value });
    }
}
