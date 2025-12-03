import { TOnLoadErrorParams, TOnSuccessParams, TMessage, TMode } from '@straddlecom/bridge-core';
import { CSSProperties } from 'react';
export type { TMode } from '@straddlecom/bridge-core';
export declare const useStraddleBridge: ({ mode, appUrl, allowManualEntry, verbose, }: {
    mode?: TMode;
    appUrl?: string;
    allowManualEntry: boolean;
    verbose?: boolean;
}) => {
    send: (message: TMessage) => void;
    bridgeAppMounted: boolean;
    setBridgeAppMounted: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    url: string;
    appUrl: string;
};
declare global {
    interface Window {
        __STRADDLE_BRIDGE__?: {
            mounted: boolean;
            mounting: boolean;
            owner?: symbol;
        };
    }
}
type TypeStraddleBridgeProps = {
    mode?: TMode;
    appUrl?: string;
    open?: boolean;
    token: string;
    onSuccess: (payload: TOnSuccessParams) => void;
    onSuccessCTAClicked?: () => void;
    onClose?: () => void;
    onLoadError?: (err: TOnLoadErrorParams) => void;
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