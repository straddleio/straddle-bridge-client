export type TBaseMessage<T = any> = {
    type: Exclude<EBridgeMessageType, EBridgeMessageType.DEBUG | EBridgeMessageType.INITIALIZE>;
    payload?: T;
};
export type TPaykeyMessage = TBaseMessage<{
    paykey: string;
}>;
export type TMessageInitialize = {
    type: EBridgeMessageType.INITIALIZE;
    token: string;
};
export type TMessageDebug = {
    type: EBridgeMessageType.DEBUG;
    enable: boolean;
};
export type TMessage = TBaseMessage | TMessageInitialize | TMessageDebug | TPaykeyMessage;
export declare enum EBridgeMessageType {
    PING = "@straddleio/js-bridge/ping",
    ERROR = "@straddleio/js-bridge/error",
    INITIALIZE = "@straddleio/js-bridge/initialize",
    INITIALIZING = "@straddleio/js-bridge/initializing",
    INITIALIZED = "@straddleio/js-bridge/initialized",
    MOUNTED = "@straddleio/js-bridge/mounted",
    ON_PAYKEY = "@straddleio/js-bridge/on-wallet-token",
    ON_SUCCESS = "@straddleio/js-bridge/on-success",
    ON_SUCCESS_CTA_CLICKED = "@straddleio/js-bridge/on-success-cta-clicked",
    ON_CLOSE = "@straddleio/js-bridge/on-close",
    TOKEN = "@straddleio/js-bridge/token",
    DEBUG = "@straddleio/js-bridge/debug"
}
//# sourceMappingURL=types.d.ts.map