import { TMessage, TPaykeyResponse } from '@straddleio/bridge-core';
export declare const straddleBridge: {
    getUrl: () => string;
    origin: string;
    mounted: boolean;
    verbose: boolean;
    init: (params: {
        appUrl: string;
        token: string;
        onSuccess?: ((payload: TPaykeyResponse) => void) | undefined;
        onSuccessCTAClicked?: (() => void) | undefined;
        onClose?: (() => void) | undefined;
        onLoadError?: ((err: ErrorEvent) => void) | undefined;
        onManualEntry?: (() => void) | undefined;
        onRetry?: (() => void) | undefined;
        targetRef: HTMLElement | undefined;
        style: Partial<CSSStyleDeclaration>;
        className?: string | undefined;
        verbose?: boolean | undefined;
    }) => void;
    getIframe: () => HTMLIFrameElement;
    show: () => void;
    hide: () => void;
    remove: () => void;
    send: (message: TMessage) => void;
};
//# sourceMappingURL=index.d.ts.map