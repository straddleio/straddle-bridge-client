'use client'
import { EBridgeMessageType, TMessage, TPaykeyResponse } from '@straddleio/bridge-core'
import { CSSProperties, forwardRef, Ref, useEffect, useRef, useState } from 'react'

const IFRAME_ID = 'Straddle-widget-iframe'

export const useStraddleBridge = ({ appUrl }: { appUrl: string }) => {
    const [iframeMounted, setIframeMounted] = useState(false)
    const [bridgeAppMounted, setBridgeAppMounted] = useState(false)
    console.log({ bridgeAppMounted })
    const parentOrigin = getParentOrigin()
    const url = `${appUrl}/${parentOrigin}/`
    const send = (message: TMessage) => {
        const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement
        if (iframe) {
            iframe.contentWindow?.postMessage(message, url)
        }
    }
    return { send, iframeMounted, setIframeMounted, bridgeAppMounted, setBridgeAppMounted, url }
}
const getParentOrigin = () => typeof window !== 'undefined' && encodeURIComponent(window.location.origin)

type TypeStraddleBridgeProps = {
    appUrl: string
    open?: boolean
    token: string
    onSuccess?: (payload: TPaykeyResponse) => void
    onSuccessCTAClicked?: () => void
    onClose?: () => void
    onLoadError?: (err: ErrorEvent) => void
    onManualEntry?: () => void
    onRetry?: () => void
    className?: string
    style?: CSSProperties
}

export const StraddleBridge = forwardRef<HTMLElement, TypeStraddleBridgeProps & { verbose?: boolean }>((props, ref) => {
    const { appUrl, open = true, token, onSuccess, onSuccessCTAClicked, onClose, onLoadError, onManualEntry, onRetry, className, style, verbose } = props
    const { send, setIframeMounted, bridgeAppMounted, setBridgeAppMounted, url } = useStraddleBridge({ appUrl })
    const iframeMounted = useRef(false)
    useEffect(() => {
        if (open && !iframeMounted.current) {
            iframeMounted.current = true
            const iframe = document.createElement('iframe')
            iframe.setAttribute('src', url)
            iframe.addEventListener('error', (errorEvent) => {
                console.error('Error loading Straddle Widget')
                onLoadError?.(errorEvent)
            })
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
                    console.warn('ref passed to StraddleBridge is not a valid ref, reverting to appening to body. Ref passed:', ref.current)
                }
                document.getElementsByTagName('body')[0].appendChild(iframe)
            }

            window.addEventListener('message', function (event: MessageEvent<TMessage>) {
                // Make sure the message is from the expected origin
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
            })
        } else if (!open && iframeMounted) {
            document.querySelector(`#${IFRAME_ID}`)?.remove()
            setIframeMounted(false)
            iframeMounted.current = false
            setBridgeAppMounted(false)
        }
    }, [open, bridgeAppMounted])
    useEffect(() => {
        typeof window !== 'undefined' &&
            ((window as any).verbose = {
                enable: () => send({ type: EBridgeMessageType.DEBUG, enable: true }),
                disable: () => send({ type: EBridgeMessageType.DEBUG, enable: false }),
            })
    }, [])
    return null
})

StraddleBridge.displayName = 'StraddleBridge'
