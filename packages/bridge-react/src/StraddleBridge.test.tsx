import React, { createRef } from 'react'
import { render, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { StraddleBridge } from './StraddleBridge'
import { EBridgeMessageType } from '@straddlecom/bridge-core'

describe('StraddleBridge', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
        vi.restoreAllMocks()
    })

    it('mounts iframe when open and removes when closed', () => {
        const onClose = vi.fn()
        render(<StraddleBridge token="token" onSuccess={() => {}} onClose={onClose} />)

        const iframe = document.querySelector('#Straddle-widget-iframe') as HTMLIFrameElement
        expect(iframe).toBeTruthy()

        // simulate message from same origin to initialize and then close
        act(() => {
            window.dispatchEvent(
                new MessageEvent('message', {
                    origin: 'https://bridge.straddle.com',
                    data: { type: EBridgeMessageType.MOUNTED },
                })
            )
        })

        act(() => {
            window.dispatchEvent(
                new MessageEvent('message', {
                    origin: 'https://bridge.straddle.com',
                    data: { type: EBridgeMessageType.ON_CLOSE },
                })
            )
        })

        expect(onClose).toHaveBeenCalled()
        expect(document.querySelector('#Straddle-widget-iframe')).toBeNull()
    })

    it('appends to provided ref when valid', () => {
        const containerRef = createRef<HTMLDivElement>()
        const { rerender } = render(
            <div ref={containerRef}>
                <span>host</span>
            </div>
        )

        rerender(<StraddleBridge token="token" onSuccess={() => {}} ref={containerRef as any} />)
        const iframe = document.querySelector('#Straddle-widget-iframe') as HTMLIFrameElement
        expect(iframe?.parentElement).toBe(containerRef.current)
    })

    it('invokes callbacks for events', () => {
        const onSuccess = vi.fn()
        const onManualEntry = vi.fn()
        const onRetry = vi.fn()

        render(<StraddleBridge token="token" onSuccess={onSuccess} onManualEntry={onManualEntry} onRetry={onRetry} />)

        act(() => {
            window.dispatchEvent(
                new MessageEvent('message', {
                    origin: 'https://bridge.straddle.com',
                    data: { type: EBridgeMessageType.ON_PAYKEY, paykeyResponse: { ok: true } },
                })
            )
        })
        expect(onSuccess).toHaveBeenCalledWith({ ok: true })

        act(() => {
            window.dispatchEvent(
                new MessageEvent('message', {
                    origin: 'https://bridge.straddle.com',
                    data: { type: EBridgeMessageType.ON_MANUAL_ENTRY },
                })
            )
        })
        expect(onManualEntry).toHaveBeenCalled()

        act(() => {
            window.dispatchEvent(
                new MessageEvent('message', {
                    origin: 'https://bridge.straddle.com',
                    data: { type: EBridgeMessageType.ON_RETRY },
                })
            )
        })
        expect(onRetry).toHaveBeenCalled()
    })
})
