import { EBridgeMessageType } from '@straddleio/bridge-core'
import { CSSProperties } from 'react'
type TMessage = Record<string, any> & {
    type: EBridgeMessageType
}
export declare const useStraddleBridge: () => {
    send: (message: TMessage) => void
    iframeMounted: boolean
    setIframeMounted: import('react').Dispatch<import('react').SetStateAction<boolean>>
    bridgeAppMounted: boolean
    setBridgeAppMounted: import('react').Dispatch<import('react').SetStateAction<boolean>>
    origin: string | undefined
    url: string
}
type TypeStraddleBridgeProps = {
    open?: boolean
    token: string
    onBridgeToken?: () => void
    onSuccess?: () => void
    onSuccessCTAClicked?: () => void
    className?: string
    style?: CSSProperties
}
export declare const StraddleBridge: import('react').ForwardRefExoticComponent<TypeStraddleBridgeProps & import('react').RefAttributes<HTMLElement>>
export {}
//# sourceMappingURL=StraddleBridge.d.ts.map
