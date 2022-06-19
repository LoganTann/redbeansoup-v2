export interface openAiUsageReponse {
    data: Array<{
        /** use Date(value * 1000) to get actual timestamp */
        aggregation_timestamp: number;
        /** value is obviously in decimal */
        cost_usd_total: number;
    }>;
    amount_granted_usd: number;
    amount_grant_used_usd: number;
}
