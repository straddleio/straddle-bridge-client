'use client'
import { EBridgeMessageType, TMessage, TMode, TPaykeyResponse } from '@straddleio/bridge-core'
import { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react'
export type { TMode } from '@straddleio/bridge-core'

const IFRAME_ID = 'Straddle-widget-iframe'

const appUrlDictionary: Record<TMode, string> = {
    production: 'https://bridge.straddle.io',
    sandbox: 'https://bridge-sandbox.straddle.io',
}

const getAppURLFromMode = (mode?: TMode) => appUrlDictionary[mode ?? 'production']

export const useStraddleBridge = ({ mode, appUrl }: { mode?: TMode; appUrl?: string }) => {
    appUrl = appUrl ?? getAppURLFromMode(mode)
    appUrl = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl
    const [bridgeAppMounted, setBridgeAppMounted] = useState(false)
    const parentOrigin = getParentOrigin()
    const url = `${appUrl}/${parentOrigin}/`
    const send = (message: TMessage) => {
        const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement
        if (iframe) {
            iframe.contentWindow?.postMessage(message, appUrl)
        }
    }
    return { send, bridgeAppMounted, setBridgeAppMounted, url, appUrl }
}
const getParentOrigin = () => typeof window !== 'undefined' && encodeURIComponent(window.location.origin.replace('https://', '').replace('http://', ''))

type TypeStraddleBridgeProps = {
    mode?: TMode
    appUrl?: string
    open?: boolean
    token: string
    onSuccess: (payload: TPaykeyResponse) => void
    onSuccessCTAClicked?: () => void
    onClose?: () => void
    onLoadError?: (err: ErrorEvent) => void
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
    const { send, setBridgeAppMounted, url, appUrl } = useStraddleBridge({ mode, appUrl: props.appUrl })
    const iframeMounted = useRef(false)
    useEffect(() => {
        let errorHandler: (errorEvent: ErrorEvent) => void
        let messageHandler: (event: MessageEvent<TMessage>) => void
        if (open && !iframeMounted.current) {
            let iframe: HTMLIFrameElement | null = document.querySelector('#' + IFRAME_ID)
            if (!iframe) {
                iframe = document.createElement('iframe')
                iframe.setAttribute('src', `${url}?allowManualEntry=${allowManualEntry}`)
            }
            errorHandler = (errorEvent: ErrorEvent) => {
                console.error('Error loading Straddle Widget')
                onLoadError?.(errorEvent)
            }
            if (iframe) {
                iframe.addEventListener('error', errorHandler)
            }
            iframe.id = IFRAME_ID
            let iframe_style = style
            if (!style) {
                iframe_style = { position: 'fixed', width: '100%', height: '100%', top: '0%', left: '0', zIndex: '2147483647' }
                // iframe_style = { position: 'fixed', width: '100%', height: '100%', top: '0%', left: '0', zIndex: '2147483647', backgroundColor: '#fafaf9' }
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
                    console.warn('ref passed to StraddleBridge is not a valid ref, reverting to appening to body. Ref passed:', ref.current)
                }
                document.getElementsByTagName('body')[0].appendChild(iframe)
                iframeMounted.current = true
            }
            messageHandler = function (event: MessageEvent<TMessage>) {
                // Make sure the message is from the expected origin
                // console.log('Message here', event.origin, appUrl, event.data)
                if (event.origin === appUrl) {
                    verbose &&
                        event.data.type !== EBridgeMessageType.CONSOLE &&
                        console.log('Straddle Bridge React client, Message received from widget:', event.data.type, event)
                    const message = event.data
                    switch (message?.type) {
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
            }
            window.addEventListener('message', messageHandler)
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
