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
