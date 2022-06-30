import { DataTypes, Model } from "denodb";

export default class Lore extends Model {
    static table = "lores";

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,

        title: DataTypes.STRING,
        description: DataTypes.STRING,
        thumb: DataTypes.STRING,
        image: DataTypes.STRING,
        color: DataTypes.STRING,
    };
    static timestamps = true;
}
