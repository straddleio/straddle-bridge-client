import { EBridgeMessageType } from '@straddleio/bridge-core';
import { CSSProperties } from 'react';
type TMessage = Record<string, any> & {
    type: EBridgeMessageType;
};
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
    onSuccess?: (payload: any) => void;
    onSuccessCTAClicked?: () => void;
    className?: string;
    style?: CSSProperties;
};
export declare const StraddleBridge: import("react").ForwardRefExoticComponent<TypeStraddleBridgeProps & import("react").RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=StraddleBridge.d.ts.map