import { MiddlewareType, Request } from "aqua";
import { nanoid } from "nanoid";
import app from "./app.ts";

app.register(async (req) => {
    if (Session.isSessionInvalid(req)) {
        console.log("Invalid session", req.cookies["session"]);
        console.log("a", req.headers.cookie);
        console.log("b", req.cookies);
        req.cookies["session"] = await nanoid(10);
    }
    return req;
}, MiddlewareType.Incoming);

app.register((req, res) => {
    if (!res.cookies) {
        res.cookies = {};
    }
    if (!res.cookies["session"]) {
        res.cookies["session"] = req.cookies["session"];
    }
    return res;
}, MiddlewareType.Outgoing);
/**
 * Memory-based session system.
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
        return !sessionId.match(/^[A-Za-z0-9_-]{10}$/);
    }

    set(key: string, value: string): void {
        Session.storage[this.id][key] = value;
    }
    get(key: string): string {
        return Session.storage[this.id][key];
    }
}
