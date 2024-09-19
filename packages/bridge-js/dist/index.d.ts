import { TMessage } from '@straddleio/bridge-core';
export declare const straddleBridge: {
    getUrl: () => string;
    origin: string;
    mounted: boolean;
    verbose: boolean;
    init: (params: {
        appUrl: string;
        token: string;
        onSuccess?: ((payload: {
            paykey: string;
        }) => void) | undefined;
        onSuccessCTAClicked?: (() => void) | undefined;
        style: Partial<CSSStyleDeclaration>;
        verbose?: boolean | undefined;
    }) => void;
    getIframe: () => HTMLIFrameElement;
    show: () => void;
    hide: () => void;
    remove: () => void;
    send: (message: TMessage) => void;
};
//# sourceMappingURL=index.d.ts.map