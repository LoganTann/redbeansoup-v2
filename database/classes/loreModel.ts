import { DataTypes, Model, Relationships } from "denodb";

export default class Lore extends Model {
    static table = "lores";

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        key: DataTypes.STRING,
        value: DataTypes.STRING,
    };
}

import Guild from "./guildModel.ts";
Relationships.belongsTo(Lore, Guild);
