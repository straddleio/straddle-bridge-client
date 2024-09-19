import { EBridgeMessageType, TMessage } from '@straddleio/bridge-core'

const straddleBridge = {
    getUrl: () => `${straddleBridge.origin}/${encodeURIComponent(window.location.origin)}/`,
    origin: '',
    mounted: false,
    verbose: false,
    init: function init(params: {
        appUrl: string
        token: string
        onSuccess?: (payload: { paykey: string }) => void
        onSuccessCTAClicked?: () => void
        onBridgeToken?: () => void
        style: Partial<CSSStyleDeclaration>
        verbose?: boolean
    }) {
        const { appUrl, token, onSuccess, onSuccessCTAClicked, onBridgeToken, style, verbose = false } = params
        straddleBridge.origin = appUrl ?? 'https://dev.straddle.io'
        verbose && console.log('init called')
        const iframe = document.createElement('iframe')
        iframe.setAttribute('src', straddleBridge.getUrl())
        iframe.id = 'Straddle-widget-iframe'
        Object.assign(iframe.style, style)
        document.getElementsByTagName('body')[0].appendChild(iframe)
        window.addEventListener('message', function (event: MessageEvent<TMessage>) {
            if (event.origin === straddleBridge.origin) {
                verbose && console.log('Message received from widget:', event.data.type, event)
                switch (event.data?.type) {
                    case EBridgeMessageType.MOUNTED:
                        if (!straddleBridge.mounted) {
                            straddleBridge.mounted = true
                            straddleBridge.send({ type: EBridgeMessageType.INITIALIZE, token })
                        }
                        break
                    case EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:
                        document.getElementsByTagName('body')[0].removeChild(iframe)
                        onSuccessCTAClicked?.()
                        break
                    case EBridgeMessageType.ON_PAYKEY:
                        onSuccess?.(event.data)
                        break
                    case EBridgeMessageType.TOKEN:
                        onBridgeToken?.()
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
;(window as any).straddleBridge = straddleBridge

Object.defineProperty(straddleBridge, 'debug', {
    value: {
        enable: () => straddleBridge.send({ type: EBridgeMessageType.DEBUG, enable: true }),
        disable: () => straddleBridge.send({ type: EBridgeMessageType.DEBUG, enable: false }),
    },
    enumerable: false,
    writable: false,
    configurable: false,
})
