export default interface IWholesomeInfo {
    name: string;
    apiName?: string;
    description: string;
    singleTitle: string;
    targetedUser?: {
        argDescription: string;
        replyDescription: string;
    };
}
