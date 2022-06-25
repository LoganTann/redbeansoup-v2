import IModel from "../IModel.ts";

const loreModel: IModel = {
    createTable: `
        CREATE TABLE IF NOT EXISTS lores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            permissions MEDIUMTEXT  NOT NULL,
            name TINYTEXT NOT NULL,
            
            title TINYTEXT NOT NULL,
            description MEDIUMTEXT NOT NULL,
            thumb MEDIUMTEXT,
            image MEDIUMTEXT,
            color VARCHAR(10),

            created_at timestamp not null default current_timestamp,
            updated_at timestamp not null default current_timestamp
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
};

export default loreModel;
