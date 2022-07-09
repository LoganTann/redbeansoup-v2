import { MiddlewareType, Request } from "aqua";
import { nanoid } from "nanoid";
import app from "./app.ts";
import { log } from "framework/logger.ts";

// Below registers input and output middlewares related to session.
app.register(async (req) => {
    if (Session.isSessionInvalid(req)) {
        req.cookies["session"] = await nanoid(10);
    }
    return req;
}, MiddlewareType.Incoming);

app.register((req, res) => {
    if (!res.headers) {
        res.headers = {};
    }
    // Assumes below session is valid.
    if (req.cookies["session"]) {
        res.headers["Set-Cookie"] = `session=${req.cookies["session"]}; Path=/`;
    } else {
        log.error("No session cookie defined on request", req);
    }
    return res;
}, MiddlewareType.Outgoing);

/**
 * Class that uses a very basic session system.
 * Storage is persisted in Heap.
 */
export default class Session {
    public id: string;
    private static storage: Record<string, Record<string, string>> = {};
    constructor(req: Request) {
        this.id = req.cookies["session"];
        if (!this.id) {
            throw new Error("Session id is not defined");
        }
        if (!Session.storage[this.id]) {
            Session.storage[this.id] = {};
        }
    }

    public static isSessionInvalid(req: Request): boolean {
        const sessionId: string = req.cookies["session"] || "";
        if (sessionId.match(/^[A-Za-z0-9_-]{10}$/)) {
            // vvv if the session array does not exist, the sessions is invalid
            return !Session.storage[sessionId];
        }
        return true;
    }

    set(key: string, value: string): void {
        Session.storage[this.id][key] = value;
    }
    get(key: string): string {
        return Session.storage[this.id][key];
    }
}
