import { openAiUsageReponse } from "./OpenAiTypes.ts";
import { getNextMonday, getLastMonday } from "../datesManager.ts";

function getNumberOfDaysBetweenDates(startDate: Date, endDate: Date) {
    const start = startDate.getTime();
    const end = endDate.getTime();
    return (end - start) / (1000 * 60 * 60 * 24);
}

function createProgressBar(maxChars: number, current: number, total: number) {
    const nbPlainChars = Math.floor((current * maxChars) / total);
    const nbEmptyChars = maxChars - nbPlainChars;
    const plain = "█".repeat(nbPlainChars);
    const empty = "-".repeat(nbEmptyChars);
    return `Remaining credits : \`[${plain}${empty}] $${current.toFixed(
        3
    )}/$${total}\``;
}

/**
 * @param usage
 * @returns
 */
export function generateUsageChart(
    startDate: Date,
    endDate: Date,
    usage: openAiUsageReponse
): string {
    if (!usage.data || usage.data.length <= 0) {
        return "Error : no data : " + JSON.stringify(usage);
    }
    const bar = createProgressBar(
        48,
        usage.amount_grant_used_usd,
        usage.amount_granted_usd
    );

    let todayUsage = 0;
    let monthUsage = 0;
    for (const data of usage.data) {
        monthUsage += data.cost_usd_total;
        const date = new Date(data.aggregation_timestamp * 1000);
        if (Date.now() - date.getTime() > 1000 * 60 * 60 * 24) {
            todayUsage = data.cost_usd_total;
            break;
        }
    }
    return (
        "Redbeansoup-bot has two artificial intelligence commands, based on the GPT-3 algorithm, powered by the OpenAI service. \n" +
        "- `$momo` : A general purpose AI that respond to any kind of requests (Q&A, create articles or sumarize text...). I advise you to read https://beta.openai.com/examples/ \n" +
        "- `$ayano` : It's a tchatbot based on momo, that haves its own personnality and keeps in memory the context of the last 10 interactions with her. \n\n" +
        `You used $${monthUsage.toFixed(
            2
        )} since 1 month, including $${todayUsage.toFixed(3)} today.\n` +
        bar
    );
}
