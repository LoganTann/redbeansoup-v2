export default interface IContext {
    replyText(text: string): Promise<void>;
}
