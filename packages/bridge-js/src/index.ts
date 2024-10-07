import { EBridgeMessageType, TMessage, TPaykeyResponse } from '@straddleio/bridge-core'

const IFRAME_ID = 'Straddle-widget-iframe'

export const straddleBridge = {
    getUrl: () => `${straddleBridge.origin}/${encodeURIComponent(typeof window !== 'undefined' && window.location.origin)}/`,
    origin: '',
    mounted: false,
    verbose: false,
    init: function init(params: {
        appUrl: string
        token: string
        onSuccess?: (payload: TPaykeyResponse) => void
        onSuccessCTAClicked?: () => void
        onClose?: () => void
        onLoadError?: (err: ErrorEvent) => void
        onManualEntry?: () => void
        onRetry?: () => void
        targetRef: HTMLElement | undefined
        style: Partial<CSSStyleDeclaration>
        className?: string
        verbose?: boolean
    }) {
        const {
            appUrl,
            token,
            onSuccess,
            onSuccessCTAClicked,
            onClose,
            onLoadError,
            onManualEntry,
            onRetry,
            targetRef,
            style,
            className,
            verbose = false,
        } = params
        straddleBridge.origin = appUrl ?? 'https://dev.straddle.io'
        verbose && console.log('init called')
        const iframe = document.createElement('iframe')
        iframe.setAttribute('src', straddleBridge.getUrl())
        iframe.addEventListener('error', (errorEvent) => {
            console.error('Error loading Straddle Widget')
            onLoadError?.(errorEvent)
        })
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
        typeof window !== 'undefined' &&
            window.addEventListener('message', function (event: MessageEvent<TMessage>) {
                if (event.origin === straddleBridge.origin) {
                    verbose && console.log('Message received from widget:', event.data.type, event)
                    const message = event.data
                    switch (message?.type) {
                        case EBridgeMessageType.MOUNTED:
                            straddleBridge.mounted = true
                            straddleBridge.send({ type: EBridgeMessageType.INITIALIZE, token })
                            break
                        case EBridgeMessageType.ON_CLOSE:
                            onClose?.()
                            straddleBridge.mounted = false
                            document.querySelector(`#${IFRAME_ID}`)?.remove()
                            break
                        case EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:
                            document.getElementsByTagName('body')[0].removeChild(iframe)
                            onSuccessCTAClicked?.()
                            break
                        case EBridgeMessageType.ON_MANUAL_ENTRY:
                            onManualEntry?.()
                            break
                        case EBridgeMessageType.ON_RETRY:
                            onRetry?.()
                            break
                        case EBridgeMessageType.ON_PAYKEY:
                            onSuccess?.(message.paykeyResponse)
                            // onSuccess?.(message as any)
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
                                'method' in message && (console[message.method] as Function).apply(console, parsedPayload)
                            }
                            break
                    }
                }
            })
    },
    getIframe: () => document.getElementById('Straddle-widget-iframe') as HTMLIFrameElement,
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
        const iframe = straddleBridge.getIframe()
        iframe.remove()
        straddleBridge.mounted = false
    },
    send: function send(message: TMessage) {
        const iframe = document.getElementById('Straddle-widget-iframe') as HTMLIFrameElement
        console.log('sending message:', message)
        iframe?.contentWindow?.postMessage(message, straddleBridge.origin)
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
