'use client'
import { EBridgeMessageType } from '@straddleio/bridge-core'
import { CSSProperties, forwardRef, Ref, useEffect, useState } from 'react'

const DEBUG = false
const IFRAME_ID = 'Straddle-widget-iframe'

type TMessage = Record<string, any> & { type: EBridgeMessageType }
export const useStraddleBridge = ({ appUrl }: { appUrl: string }) => {
    const [iframeMounted, setIframeMounted] = useState(false)
    const [bridgeAppMounted, setBridgeAppMounted] = useState(false)

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
    onSuccess?: (payload: any) => void
    onSuccessCTAClicked?: () => void
    className?: string
    style?: CSSProperties
}

export const StraddleBridge = forwardRef<HTMLElement, TypeStraddleBridgeProps>((props: TypeStraddleBridgeProps, ref: Ref<HTMLElement>) => {
    const { appUrl, open = true, token, onSuccess, onSuccessCTAClicked, className, style } = props
    const { send, iframeMounted, setIframeMounted, bridgeAppMounted, setBridgeAppMounted, url } = useStraddleBridge({ appUrl })
    useEffect(() => {
        if (open && !iframeMounted) {
            setIframeMounted(true)
            const iframe = document.createElement('iframe')
            iframe.setAttribute('src', url)
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
            if (ref && 'current' in ref) {
                ;(ref.current as HTMLElement).appendChild(iframe)
            } else {
                document.getElementsByTagName('body')[0].appendChild(iframe)
            }

            window.addEventListener('message', function (event) {
                // Make sure the message is from the expected origin
                if (event.origin === appUrl) {
                    DEBUG && console.log('Message received from widget:', event.data.type, event)
                    switch (event.data?.type) {
                        case EBridgeMessageType.PING:
                            break
                        case EBridgeMessageType.MOUNTED:
                            if (!bridgeAppMounted) {
                                setBridgeAppMounted(true)
                                send({ type: EBridgeMessageType.INITIALIZE, token })
                            }
                            break
                        case EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:
                            onSuccessCTAClicked?.()
                            break
                        case EBridgeMessageType.ON_PAYKEY:
                            onSuccess?.(event.data)
                            break
                        case '@straddleio/bridge-js/log':
                            {
                                const parsedPayload: any = event.data.payload.map((item: any) => {
                                    try {
                                        return JSON.parse(item)
                                    } catch {
                                        return item
                                    }
                                })
                                ;(console[event.data.method as keyof typeof console] as Function).apply(console, parsedPayload)
                            }
                            break
                    }
                }
            })
        } else if (!open && iframeMounted) {
            document.querySelector(`#${IFRAME_ID}`)?.remove()
            setIframeMounted(false)
            setBridgeAppMounted(false)
        }
    }, [open])
    useEffect(() => {
        typeof window !== 'undefined' &&
            ((window as any).debug = {
                enable: () => send({ type: EBridgeMessageType.DEBUG, enable: true }),
                disable: () => send({ type: EBridgeMessageType.DEBUG, enable: false }),
            })
    }, [])
    return null
})

StraddleBridge.displayName = 'StraddleBridge'