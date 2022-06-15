import { log } from "../logger.ts";

export default class Context {
    constructor() {}

    reply(message: string) {
        log.info("Context reply", message);
    }
}
