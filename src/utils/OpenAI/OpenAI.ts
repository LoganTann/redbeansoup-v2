import { dateToUniversalString } from "../datesManager.ts";
import { openAiUsageReponse, openAiCompletionResponse } from "./OpenAiTypes.ts";

/**
 * Deno wrapper for the OpenAI API
 * inspired from https://github.com/load1n9/openai/blob/master/mod.ts
 */
export default class OpenAIClient {
    static readonly ROOT = "https://api.openai.com/v1/";

    constructor(private privKey: string) {}

    async fetchCompletion(
        prompt: string,
        engine = "text-davinci-002",
        temperature = 0.3,
        max_tokens = 256,
        top_p = 1,
        frequency_penalty = 0.5,
        presence_penalty = 0
    ): Promise<openAiCompletionResponse> {
        const response = await fetch(
            `${OpenAIClient.ROOT}engines/${engine}/completions`,
            {
                body: JSON.stringify({
                    prompt,
                    temperature,
                    max_tokens,
                    top_p,
                    frequency_penalty,
                    presence_penalty,
                }),
                headers: {
                    Authorization: `Bearer ${this.privKey}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );
        return response.json();
    }

    async fetchUsage(
        startDate: Date,
        endDate: Date
    ): Promise<openAiUsageReponse> {
        const processedStartDate = dateToUniversalString(startDate);
        const processedEndDate = dateToUniversalString(endDate);
        const requestURl = `${OpenAIClient.ROOT}usage?start_date=${processedStartDate}&end_date=${processedEndDate}`;
        const response = await fetch(requestURl, {
            headers: { Authorization: `Bearer ${this.privKey}` },
            method: "GET",
        });
        return response.json();
    }
}
