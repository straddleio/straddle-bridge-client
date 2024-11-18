import { TMessage, TPaykeyResponse } from '@straddleio/bridge-core';
import { CSSProperties } from 'react';
export declare const useStraddleBridge: ({ appUrl }: {
    appUrl: string;
}) => {
    send: (message: TMessage) => void;
    iframeMounted: boolean;
    setIframeMounted: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    bridgeAppMounted: boolean;
    setBridgeAppMounted: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    url: string;
};
type TypeStraddleBridgeProps = {
    appUrl: string;
    open?: boolean;
    token: string;
    onSuccess?: (payload: TPaykeyResponse) => void;
    onSuccessCTAClicked?: () => void;
    onClose?: () => void;
    onLoadError?: (err: ErrorEvent) => void;
    allowManualEntry?: boolean;
    onManualEntry?: () => void;
    onRetry?: () => void;
    className?: string;
    style?: CSSProperties;
};
export declare const StraddleBridge: import("react").ForwardRefExoticComponent<TypeStraddleBridgeProps & {
    verbose?: boolean;
} & import("react").RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=StraddleBridge.d.ts.map