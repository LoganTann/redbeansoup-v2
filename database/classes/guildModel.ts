import IModel from "../IModel.ts";

const guildModel: IModel = {
    createTable: `
        CREATE TABLE IF NOT EXISTS guilds (
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            guildId varchar(20) NOT NULL,
            created_at timestamp not null default current_timestamp
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
};
export default guildModel;
