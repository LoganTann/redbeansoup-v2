import { Client } from "mysql";
export default class LoreRepository {
    constructor(private client: Client) {}

    public async createLore(name: string, title: string, description: string) {
        return await this.client.execute(
            `INSERT INTO lores(permissions, name, title, description) VALUES(?, ?, ?, ?)`,
            ["global", name, title, description]
        );
    }

    public async readLore(name: string) {
        return await this.client.query(
            `SELECT name, title, description FROM lores WHERE name=?`,
            [name]
        );
    }
}
