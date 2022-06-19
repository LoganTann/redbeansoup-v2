import {
    ApplicationCommandOption,
    ApplicationCommandOptionTypes,
} from "discordeno";
import log from "../logger.ts";

export default class MessageArgumentParser {
    private readonly prefix = "$"; // assume it won't change. YAGNI.

    constructor(private options: ApplicationCommandOption[]) {}

    private readonly regexPieces = {
        string: "(?<NAME>\\S+)",
        user: "\\<\\@(?<NAME>\\d+)\\>",
        integer: "(?<NAME>\\d+)",
        // special
        lastString: "(?<NAME>.+)",
        join: "\\s+",
        botPrefix: `\\${this.prefix}\\w+`,
        botSuffix: "\\s*",
    };

    private getType(option: ApplicationCommandOption) {
        switch (option.type) {
            case ApplicationCommandOptionTypes.SubCommand:
            case ApplicationCommandOptionTypes.SubCommandGroup:
                throw `SubCommand or SubCommandGroup not supported yet for argument name ${option.name}`;
            case ApplicationCommandOptionTypes.Attachment:
                throw `Attachment argument not supported yet for argument name ${option.name}.`;
            case ApplicationCommandOptionTypes.Boolean:
                throw `Boolean argument not supported yet for argument name ${option.name}. Use String instead.`;
            case ApplicationCommandOptionTypes.Channel:
            case ApplicationCommandOptionTypes.Role:
            case ApplicationCommandOptionTypes.Mentionable:
                throw `Non-user mentionnable arguments not supported yet for argument name ${option.name}. Please use User instead.`;
            case ApplicationCommandOptionTypes.Number:
                throw `decimal numbers not supported yet for argument name ${option.name}. Please use Integer instead.`;
            case ApplicationCommandOptionTypes.String:
                return "string";
            case ApplicationCommandOptionTypes.User:
                return "user";
            case ApplicationCommandOptionTypes.Integer:
                return "integer";
            default:
                throw `Unhandled option type for argument ${option.name} : ${option.type}`;
        }
    }

    normalizeOptions() {
        const deducedSyntax: Array<{
            name: string;
            type: string;
            required: boolean;
        }> = [];
        let lastStringOption: string = "";
        for (const option of this.options) {
            const type = this.getType(option);
            if (type === "string") {
                lastStringOption = option.name;
            }
            deducedSyntax.push({
                name: option.name,
                type,
                required: option.required || false,
            });
        }

        const docSyntax = [];
        const regexSyntax = [this.regexPieces.botPrefix];
        for (const argument of deducedSyntax) {
            let regexPiece = "";
            let docPiece = argument.name;
            switch (argument.type) {
                case "user":
                    docPiece = `<@${docPiece}>`;
                    regexPiece = this.regexPieces.user;
                    break;
                case "integer":
                    regexPiece = this.regexPieces.integer;
                    break;
                default:
                    if (lastStringOption === argument.name) {
                        docPiece = "..." + docPiece;
                        regexPiece = this.regexPieces.lastString;
                        break;
                    }
                    regexPiece = this.regexPieces.string;
            }
            if (!argument.required) {
                docPiece = `[${docPiece}]`;
                regexPiece = `\\s*(?:${regexPiece})?`;
            } else {
                regexPiece = `\\s+${regexPiece}`;
            }
            docSyntax.push(docPiece);
            regexSyntax.push(regexPiece.replace("NAME", argument.name));
        }
        return {
            docSyntax: `${this.prefix}NAME ${docSyntax.join(" ")}`,
            regexSyntax: regexSyntax.join("") + this.regexPieces.botSuffix,
        };
    }
}
