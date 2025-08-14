import { EBridgeMessageType, TMessage, TMode } from '@straddleio/bridge-core'
export type { TMode } from '@straddleio/bridge-core'
type TOnLoadErrorParams = { error_code: 'iframe_error'; error: ErrorEvent; message: string } | { error_code: 'init_error'; message: any; origin: string }
type TOnSuccessParams = import('@straddleio/bridge-core').TPaykeyResponse

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

const getParentOrigin = () => [
    typeof window !== 'undefined' && encodeURIComponent(window.location.origin.replace('https://', '').replace('http://', '')),
    typeof window !== 'undefined' && window.location.protocol.replace(':', ''),
]

const appUrlDictionary: Record<TMode, string> = {
    production: 'https://bridge.straddle.io',
    sandbox: 'https://bridge-sandbox.straddle.io',
}

const getAppURLFromMode = (mode?: TMode) => appUrlDictionary[mode ?? 'production']

export const straddleBridge = {
    getUrl: () => {
        const [parentOrigin, protocol] = getParentOrigin()
        return `${straddleBridge.origin}/?parentOriginURL=${parentOrigin}&parentOriginProtocol=${protocol}`
    },
    origin: '',
    mounted: false,
    verbose: false,
    messageHandler: undefined as undefined | ((event: MessageEvent<TMessage>) => void),
    iframeErrorHandler: undefined as undefined | ((errorEvent: ErrorEvent) => void),
    init: function init(params: {
        mode?: TMode
        appUrl?: string
        token: string
        onSuccess: (payload: TOnSuccessParams) => void
        onSuccessCTAClicked?: () => void
        onClose?: () => void
        onLoadError?: (err: TOnLoadErrorParams) => void
        allowManualEntry?: boolean
        onManualEntry?: () => void
        onRetry?: () => void
        targetRef?: HTMLElement | undefined
        style?: Partial<CSSStyleDeclaration>
        className?: string
        verbose?: boolean
    }) {
        let {
            mode,
            appUrl,
            token,
            onSuccess,
            onSuccessCTAClicked,
            onClose,
            onLoadError,
            allowManualEntry = true,
            onManualEntry,
            onRetry,
            targetRef,
            style,
            className,
            verbose = false,
        } = params
        appUrl = appUrl ?? getAppURLFromMode(mode)
        appUrl = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl
        straddleBridge.origin = appUrl ?? 'https://bridge.straddle.io'
        straddleBridge.verbose = !!verbose
        verbose && log('init called')
        const iframe = document.createElement('iframe')
        iframe.setAttribute('src', `${straddleBridge.getUrl()}&allowManualEntry=${allowManualEntry}`)
        straddleBridge.iframeErrorHandler = (errorEvent: ErrorEvent) => {
            error('Error loading Straddle Widget')
            onLoadError?.({ error_code: 'iframe_error', error: errorEvent, message: 'Error loading Straddle Widget' })
        }
        iframe.addEventListener('error', straddleBridge.iframeErrorHandler)
        iframe.id = IFRAME_ID
        let iframe_style = style
        if (!style) {
            iframe_style = { position: 'fixed', width: '100%', height: '100%', top: '0%', left: '0', zIndex: '2147483647' }
        }
        Object.assign(iframe.style, iframe_style)

        if (className) {
            className.split(' ').forEach((className) => {
                iframe.classList.add(className)
            })
        }
        ;(targetRef || document.getElementsByTagName('body')[0]).appendChild(iframe)
        if (typeof window !== 'undefined') {
            if (straddleBridge.messageHandler) {
                window.removeEventListener('message', straddleBridge.messageHandler)
            }
            straddleBridge.messageHandler = function (event: MessageEvent<TMessage>) {
                // Make sure the message is from the expected origin
                if (event.origin === straddleBridge.origin) {
                    verbose && event.data.type !== EBridgeMessageType.CONSOLE && log('Message received from Bridge app:', event.data.type, event)
                    const message = event.data
                    switch (message?.type) {
                        case EBridgeMessageType.PING:
                            break
                        case EBridgeMessageType.MOUNTED:
                            straddleBridge.mounted = true
                            straddleBridge.send({ type: EBridgeMessageType.INITIALIZE, token })
                            break
                        case EBridgeMessageType.ON_CLOSE:
                            onClose?.()
                            straddleBridge.remove()
                            break
                        case EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:
                            onSuccessCTAClicked?.()
                            straddleBridge.remove()
                            break
                        case EBridgeMessageType.ON_MANUAL_ENTRY:
                            onManualEntry?.()
                            break
                        case EBridgeMessageType.ON_RETRY:
                            onRetry?.()
                            break
                        case EBridgeMessageType.ON_PAYKEY:
                            onSuccess?.(message.paykeyResponse)
                            break
                        case EBridgeMessageType.ERROR:
                            onLoadError?.({ error_code: 'init_error', ...message.payload, origin: event.origin })
                            break
                        case EBridgeMessageType.CONSOLE:
                            {
                                const parsedPayload: any = (message as any).payload.map((item: any) => {
                                    try {
                                        return JSON.parse(item)
                                    } catch {
                                        return item
                                    }
                                })
                                if ('method' in message) {
                                    const method = (message as any).method as keyof typeof console
                                    consoleDictionary[method]?.conditionFn(!!verbose) &&
                                        (console[method] as Function).apply(console, ['%c●%c', BRIDGE_SERVER_LOG_LABEL_STYLE, '', ...parsedPayload])
                                }
                            }
                            break
                    }
                }
            }
            window.addEventListener('message', straddleBridge.messageHandler)
        }
    },
    getIframe: () => document.getElementById(IFRAME_ID) as HTMLIFrameElement,
    show: () => {
        straddleBridge.verbose && console.log('straddleBridge.show method called.')
        const iframe = straddleBridge.getIframe()
        straddleBridge.verbose && iframe && console.log('iframe found, setting display to block.')
        iframe.style.display = 'block'
    },
    hide: () => {
        straddleBridge.verbose && console.log('straddleBridge.hide method called.')
        const iframe = straddleBridge.getIframe()
        straddleBridge.verbose && iframe && console.log('iframe found, setting display to none.')
        iframe.style.display = 'none'
    },
    remove: () => {
        straddleBridge.verbose && console.log('straddleBridge.remove method called.')
        if (typeof window !== 'undefined' && straddleBridge.messageHandler) {
            window.removeEventListener('message', straddleBridge.messageHandler)
            straddleBridge.messageHandler = undefined
        }
        const iframe = straddleBridge.getIframe()
        if (iframe && straddleBridge.iframeErrorHandler) {
            iframe.removeEventListener('error', straddleBridge.iframeErrorHandler)
            straddleBridge.iframeErrorHandler = undefined
        }
        iframe?.remove()
        straddleBridge.mounted = false
    },
    send: function send(message: TMessage) {
        const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement
        if (iframe) {
            straddleBridge.verbose && log('Bridge client: Sending message to iframe with target:', straddleBridge.origin, ', message:', message)
            iframe.contentWindow?.postMessage(message, straddleBridge.origin)
        } else {
            straddleBridge.verbose && log('Bridge client', 'No iframe found, message not sent:', message)
        }
    },
}
typeof window !== 'undefined' && ((window as any).straddleBridge = straddleBridge)

Object.defineProperty(straddleBridge, 'debug', {
    value: {
        enable: () => straddleBridge.send({ type: EBridgeMessageType.DEBUG, enable: true }),
        disable: () => straddleBridge.send({ type: EBridgeMessageType.DEBUG, enable: false }),
    },
    enumerable: false,
    writable: false,
    configurable: false,
})
