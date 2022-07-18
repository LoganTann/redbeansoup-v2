export function jsonResponse(
    code: number,
    body: Record<string, unknown> | Array<unknown>
) {
    return {
        statusCode: code,
        headers: {
            "Content-Type": "application/json",
        },
        content: JSON.stringify(body),
    };
}

export const isValidUrl = (url: string) => {
    try {
        if (url === "")
            return true;
        new URL(url);
        return true;
    } catch (_e) {
        return false;
    }
}