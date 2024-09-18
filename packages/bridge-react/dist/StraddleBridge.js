'use client'
import { EBridgeMessageType } from '@straddleio/bridge-core'
import { forwardRef, useEffect, useState } from 'react'
const DEBUG = true
const IFRAME_ID = 'Straddle-widget-iframe'
export const useStraddleBridge = () => {
    const [iframeMounted, setIframeMounted] = useState(false)
    const [bridgeAppMounted, setBridgeAppMounted] = useState(false)
    const parentOrigin = (typeof window !== 'undefined' && encodeURIComponent(window.location.origin)) || ''
    const origin = process.env.NEXT_PUBLIC_BRIDGE_APP_URL
    const url = `${origin}/${parentOrigin}/`
    const send = (message) => {
        var _a
        const iframe = document.getElementById(IFRAME_ID)
        if (iframe) {
            ;(_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(message, url)
        }
    }
    return { send, iframeMounted, setIframeMounted, bridgeAppMounted, setBridgeAppMounted, origin, url }
}
export const StraddleBridge = forwardRef((props, ref) => {
    const { open = true, token, onBridgeToken, onSuccess, onSuccessCTAClicked, className, style } = props
    const { send, iframeMounted, setIframeMounted, bridgeAppMounted, setBridgeAppMounted, origin, url } = useStraddleBridge()
    useEffect(() => {
        var _a
        if (open && !iframeMounted) {
            console.log('Mounting')
            setIframeMounted(true)
            const iframe = document.createElement('iframe')
            iframe.setAttribute('src', url)
            iframe.id = IFRAME_ID
            let iframe_style = style
            if (!style) {
                iframe_style = { position: 'fixed', width: '100%', height: '100%', top: '0%', left: '0', zIndex: 2147483647 }
            }
            iframe_style && Object.assign(iframe.style, iframe_style)
            if (className) {
                className.split(' ').forEach((className) => {
                    iframe.classList.add(className)
                })
            }
            if (ref && 'current' in ref) {
                ref.current.appendChild(iframe)
            } else {
                document.getElementsByTagName('body')[0].appendChild(iframe)
            }
            window.addEventListener('message', function (event) {
                var _a
                if (event.origin === origin) {
                    DEBUG && console.log('Message received from widget:', event.data.type, event)
                    switch ((_a = event.data) === null || _a === void 0 ? void 0 : _a.type) {
                        case EBridgeMessageType.PING:
                            console.log('PING message received from client')
                            break
                        case '@straddle/js-bridge/mounted':
                            console.log('Bridge mounted')
                            if (!bridgeAppMounted) {
                                setBridgeAppMounted(true)
                                send({ type: EBridgeMessageType.INITIALIZE, token })
                            }
                            break
                        case '@straddle/js-bridge/on-success':
                            console.log('Success')
                            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess()
                            break
                        case '@straddle/js-bridge/on-success-cta-clicked':
                            console.log('Success CTA clicked')
                            onSuccessCTAClicked === null || onSuccessCTAClicked === void 0 ? void 0 : onSuccessCTAClicked()
                            break
                        case '@straddle/js-bridge/token':
                            console.log('Token from bridge:', event.data.token)
                            onBridgeToken === null || onBridgeToken === void 0 ? void 0 : onBridgeToken()
                            break
                    }
                }
            })
        } else if (!open && iframeMounted) {
            ;(_a = document.querySelector(`#${IFRAME_ID}`)) === null || _a === void 0 ? void 0 : _a.remove()
            setIframeMounted(false)
            setBridgeAppMounted(false)
        }
    }, [open])
    return null
})
StraddleBridge.displayName = 'StraddleBridge'
