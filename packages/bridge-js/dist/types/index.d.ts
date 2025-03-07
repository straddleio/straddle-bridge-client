import { TMessage, TMode, TPaykeyResponse } from '@straddleio/bridge-core';
export type { TMode } from '@straddleio/bridge-core';
export declare const straddleBridge: {
    getUrl: () => string;
    origin: string;
    mounted: boolean;
    verbose: boolean;
    init: (params: {
        mode?: TMode | undefined;
        appUrl?: string | undefined;
        token: string;
        onSuccess: (payload: TPaykeyResponse) => void;
        onSuccessCTAClicked?: (() => void) | undefined;
        onClose?: (() => void) | undefined;
        onLoadError?: ((err: ErrorEvent) => void) | undefined;
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