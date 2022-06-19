import { openAiUsageReponse } from "./OpenAiTypes.ts";
import { getNextMonday, getLastMonday } from "../datesManager.ts";

export function generateUsageChart(usage: openAiUsageReponse): string {
    if (!usage.data || usage.data.length <= 0) {
        return "Error : no data : " + JSON.stringify(usage);
    }

    let nextMonday = getNextMonday(
        new Date(usage.data[0].aggregation_timestamp * 1000)
    );
    let max = {
        value: 0,
        date: nextMonday,
    };
    const history = [];
    let total = 0;

    for (const usageData of usage.data) {
        const entryDate = new Date(usageData.aggregation_timestamp * 1000);
        total += usageData.cost_usd_total;
        if (entryDate.getTime() > nextMonday.getTime()) {
            const lastMonday = getLastMonday(entryDate);
            history.push({ value: total, date: lastMonday });
            if (total > max.value) {
                max = { value: total, date: lastMonday };
            }
            nextMonday = getNextMonday(nextMonday);
            total = 0;
        }
    }

    return "Usage : $XX out of $YY"
        .replace("XX", "" + usage.amount_grant_used_usd)
        .replace("YY", "" + usage.amount_granted_usd)
        .concat("```\n", JSON.stringify(history, undefined, 2), "\n```");
}
