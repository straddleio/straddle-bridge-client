import { TMessage, TMode } from '@straddleio/bridge-core';
export type { TMode } from '@straddleio/bridge-core';
type TOnLoadErrorParams = {
    error_code: 'iframe_error';
    error: ErrorEvent;
    message: string;
} | {
    error_code: 'init_error';
    message: any;
    origin: string;
};
type TOnSuccessParams = import('@straddleio/bridge-core').TPaykeyResponse;
export declare const straddleBridge: {
    getUrl: () => string;
    origin: string;
    mounted: boolean;
    verbose: boolean;
    messageHandler: ((event: MessageEvent<TMessage>) => void) | undefined;
    iframeErrorHandler: ((errorEvent: ErrorEvent) => void) | undefined;
    init: (params: {
        mode?: TMode | undefined;
        appUrl?: string | undefined;
        token: string;
        onSuccess: (payload: TOnSuccessParams) => void;
        onSuccessCTAClicked?: (() => void) | undefined;
        onClose?: (() => void) | undefined;
        onLoadError?: ((err: TOnLoadErrorParams) => void) | undefined;
        allowManualEntry?: boolean | undefined;
        onManualEntry?: (() => void) | undefined;
        onRetry?: (() => void) | undefined;
        targetRef?: HTMLElement | undefined;
        style?: Partial<CSSStyleDeclaration> | undefined;
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