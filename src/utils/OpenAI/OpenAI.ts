import {
    dateToUniversalString,
    createDateWithMonthsRemoved,
} from "../datesManager.ts";
import { openAiUsageReponse } from "./OpenAiTypes.ts";

export default class OpenAIClient {
    static readonly ROOT = "https://api.openai.com/v1/";

    constructor(private privKey: string) {}

    async fetchUsage(): Promise<openAiUsageReponse> {
        const endDate = dateToUniversalString(new Date());
        const startDate = dateToUniversalString(
            createDateWithMonthsRemoved(new Date(), 3)
        );
        const requestURl = `${OpenAIClient.ROOT}usage?start_date=${startDate}&end_date=${endDate}`;
        const response = await fetch(requestURl, {
            headers: { Authorization: `Bearer ${this.privKey}` },
            method: "GET",
        });
        return response.json();
    }
}
