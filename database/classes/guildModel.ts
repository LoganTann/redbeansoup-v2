import { DataTypes, Model } from "denodb";

export default class Guild extends Model {
    static table = "guilds";

    static fields = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        announcementChannel: DataTypes.STRING,
    };
}
