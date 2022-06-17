import env from "config";

export default async function getImgUrl(imageType: string): Promise<string> {
    const req = await fetch(env.WHOLESOME_ENDPOINT.concat(imageType));
    const response = await req.text();
    return response;
}
