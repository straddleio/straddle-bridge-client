import { EBridgeMessageType, TOnLoadErrorParams, TOnSuccessParams, TMessage, TMode } from '@straddlecom/bridge-core'
import { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react'
export type { TMode } from '@straddlecom/bridge-core'

const IFRAME_ID = 'Straddle-widget-iframe'
const BRIDGE_CLIENT_LOG_LABEL_STYLE = 'color: #14b8a6; padding: 0px; border-radius: 24px; font-weight: 600;'
const BRIDGE_SERVER_LOG_LABEL_STYLE = 'color: #a855f7; padding: 0px; border-radius: 24px; font-weight: 600;'

const consoleDictionary: any = {
    log: { conditionFn: (verbose: boolean) => verbose },
    error: { conditionFn: (verbose: boolean) => true },
    warn: { conditionFn: (verbose: boolean) => true },
    info: { conditionFn: (verbose: boolean) => verbose },
    debug: { conditionFn: (verbose: boolean) => verbose },
    table: { conditionFn: (verbose: boolean) => verbose },
}
const log = (...args: any[]) => console.log('%c●%c', BRIDGE_CLIENT_LOG_LABEL_STYLE, '', ...args)
const warn = (...args: any[]) => console.warn('%c●%c', BRIDGE_CLIENT_LOG_LABEL_STYLE, '', ...args)
const error = (...args: any[]) => console.error('%c●%c', BRIDGE_CLIENT_LOG_LABEL_STYLE, '', ...args)

const appUrlDictionary: Record<TMode, string> = {
    production: 'https://bridge.straddle.com',
    sandbox: 'https://bridge-sandbox.straddle.com',
}
const getAppURLFromMode = (mode?: TMode) => appUrlDictionary[mode ?? 'production']

export const useStraddleBridge = ({
    mode,
    appUrl,
    allowManualEntry,
    verbose,
}: {
    mode?: TMode
    appUrl?: string
    allowManualEntry: boolean
    verbose?: boolean
}) => {
    appUrl = appUrl ?? getAppURLFromMode(mode)
    appUrl = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl
    const [bridgeAppMounted, setBridgeAppMounted] = useState(false)
    const [parentOrigin, protocol] = getParentOrigin()
    // const url = `${appUrl}/${parentOrigin}/?parentOriginProtocol=${protocol}&allowManualEntry=${allowManualEntry}`
    const url = `${appUrl}/?parentOriginURL=${parentOrigin}&parentOriginProtocol=${protocol}&allowManualEntry=${allowManualEntry}`
    const send = (message: TMessage) => {
        const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement
        if (iframe) {
            verbose && log('Sending message to iframe with target:', appUrl, ', message:', message)
            iframe.contentWindow?.postMessage(message, appUrl)
        } else {
            verbose && console.log('No iframe found, message not sent:', message)
        }
    }
    return { send, bridgeAppMounted, setBridgeAppMounted, url, appUrl }
}

const getParentOrigin = () => [
    typeof window !== 'undefined' && encodeURIComponent(window.location.origin.replace('https://', '').replace('http://', '')),
    typeof window !== 'undefined' && window.location.protocol.replace(':', ''),
]

type TypeStraddleBridgeProps = {
    mode?: TMode
    appUrl?: string
    open?: boolean
    token: string
    onSuccess: (payload: TOnSuccessParams) => void
    onSuccessCTAClicked?: () => void
    onClose?: () => void
    onLoadError?: (err: TOnLoadErrorParams) => void
    allowManualEntry?: boolean
    onManualEntry?: () => void
    onRetry?: () => void
    className?: string
    style?: CSSProperties
}

export const StraddleBridge = forwardRef<HTMLElement, TypeStraddleBridgeProps & { verbose?: boolean }>((props, ref) => {
    const {
        mode,
        open = true,
        token,
        onSuccess,
        onSuccessCTAClicked,
        onClose,
        onLoadError,
        allowManualEntry = true,
        onManualEntry,
        onRetry,
        className,
        style,
        verbose,
    } = props
    const { send, setBridgeAppMounted, url, appUrl } = useStraddleBridge({ mode, appUrl: props.appUrl, allowManualEntry, verbose })
    const iframeMounted = useRef(false)
    useEffect(() => {
        let errorHandler: (errorEvent: ErrorEvent) => void
        const messageHandler = function (event: MessageEvent<TMessage>) {
            const rawMessage = event.data as any
            const message = {
                ...rawMessage,
                type: typeof rawMessage?.type === 'string' ? rawMessage.type.replace('@straddleio/', '@straddlecom/') : rawMessage?.type,
            } as TMessage
            if (message?.type?.includes('@straddlecom/') && event.origin !== appUrl) {
                verbose && log('Message received from Bridge app but from unknown origin:', event.origin, event.data)
            }
            // Make sure the message is from the expected origin
            if (event.origin === appUrl) {
                verbose && message.type !== EBridgeMessageType.CONSOLE && log('Message received from Bridge app:', message.type, event)
                switch (message.type) {
                    case EBridgeMessageType.PING:
                        break
                    case EBridgeMessageType.MOUNTED:
                        setBridgeAppMounted(true)
                        send({ type: EBridgeMessageType.INITIALIZE, token })
                        break
                    case EBridgeMessageType.ON_CLOSE:
                        onClose?.()
                        setBridgeAppMounted(false)
                        document.querySelector(`#${IFRAME_ID}`)?.remove()
                        break
                    case EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:
                        onSuccessCTAClicked?.()
                        document.querySelector(`#${IFRAME_ID}`)?.remove()
                        break
                    case EBridgeMessageType.ON_PAYKEY:
                        onSuccess?.(message.paykeyResponse)
                        break
                    case EBridgeMessageType.ON_MANUAL_ENTRY:
                        onManualEntry?.()
                        break
                    case EBridgeMessageType.ON_RETRY:
                        onRetry?.()
                        break
                    case EBridgeMessageType.ERROR:
                        onLoadError?.({ error_code: 'init_error', ...message.payload, origin: event.origin })
                        break
                    case EBridgeMessageType.CONSOLE:
                        {
                            const parsedPayload: any = message.payload.map((item: any) => {
                                try {
                                    return JSON.parse(item)
                                } catch {
                                    return item
                                }
                            })
                            'method' in message &&
                                consoleDictionary[message.method]?.conditionFn(verbose) &&
                                (console[message.method] as Function).apply(console, ['%c●%c', BRIDGE_SERVER_LOG_LABEL_STYLE, '', ...parsedPayload])
                        }
                        break
                }
            } else {
                // verbose && log('Message received from unknown origin:', event.origin, event.data)
            }
        }
        window.addEventListener('message', messageHandler)
        if (open && !iframeMounted.current) {
            let iframe: HTMLIFrameElement | null = document.querySelector('#' + IFRAME_ID)
            if (!iframe) {
                iframe = document.createElement('iframe')
                iframe.setAttribute('src', url)
            }
            errorHandler = (errorEvent: ErrorEvent) => {
                error('Error loading Straddle Widget')
                onLoadError?.({ error_code: 'iframe_error', error: errorEvent, message: 'Error loading Straddle Widget' })
            }
            if (iframe) {
                iframe.addEventListener('error', errorHandler)
            }
            iframe.id = IFRAME_ID
            let iframe_style = style
            if (!style) {
                iframe_style = { position: 'fixed', width: '100%', height: '100%', top: '0%', left: '0', zIndex: '2147483647' }
            }
            iframe_style && Object.assign(iframe.style, iframe_style)

            if (className) {
                className.split(' ').forEach((className) => {
                    iframe.classList.add(className)
                })
            }
            if (ref && 'current' in ref && ref.current && ref.current instanceof Node) {
                ;(ref.current as HTMLElement).appendChild(iframe)
            } else {
                if (ref && 'current' in ref && (!ref.current || !(ref.current instanceof Node))) {
                    warn('ref passed to StraddleBridge is not a valid ref, reverting to appening to body. Ref passed:', ref.current)
                }
                document.getElementsByTagName('body')[0].appendChild(iframe)
                iframeMounted.current = true
            }
        } else if (!open) {
            document.querySelector(`#${IFRAME_ID}`)?.remove()
            iframeMounted.current = false
            setBridgeAppMounted(false)
        }
        return () => {
            const iframe: HTMLIFrameElement | null = document.querySelector('#' + IFRAME_ID)
            errorHandler && iframe && iframe.removeEventListener('error', errorHandler)
            messageHandler && window.removeEventListener('message', messageHandler)
        }
    }, [open])
    useEffect(() => {
        typeof window !== 'undefined' &&
            ((window as any).straddleDebug = {
                enable: () => send({ type: EBridgeMessageType.DEBUG, enable: true }),
                disable: () => send({ type: EBridgeMessageType.DEBUG, enable: false }),
            })
    }, [])
    return null
})

StraddleBridge.displayName = 'StraddleBridge'
