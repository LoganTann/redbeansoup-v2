import { DataTypes, Model } from "denodb";

export default class Guild extends Model {
    static table = "guilds";

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        guildId: {
            type: DataTypes.STRING,
            unique: true,
        },
    };
}
