import { TMessage, TMode, TPaykeyResponse } from '@straddleio/bridge-core';
import { CSSProperties } from 'react';
export type { TMode } from '@straddleio/bridge-core';
export declare const useStraddleBridge: ({ mode, appUrl }: {
    mode?: TMode;
    appUrl?: string;
}) => {
    send: (message: TMessage) => void;
    iframeMounted: boolean;
    setIframeMounted: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    bridgeAppMounted: boolean;
    setBridgeAppMounted: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    url: string;
};
type TypeStraddleBridgeProps = {
    mode?: TMode;
    appUrl?: string;
    open?: boolean;
    token: string;
    onSuccess: (payload: TPaykeyResponse) => void;
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
//# sourceMappingURL=StraddleBridge.d.ts.map