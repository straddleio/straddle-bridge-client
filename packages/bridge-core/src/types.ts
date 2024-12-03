export type TBaseMessage<T = any> = {
    type: Exclude<EBridgeMessageType, EBridgeMessageType.DEBUG | EBridgeMessageType.INITIALIZE | EBridgeMessageType.ON_PAYKEY>
    payload?: T
}
export type TPaykeyMessage = { type: EBridgeMessageType.ON_PAYKEY; paykeyResponse: TPaykeyResponse }
export type TMessageInitialize = {
    type: EBridgeMessageType.INITIALIZE
    token: string
}
export type TMessageDebug = {
    type: EBridgeMessageType.DEBUG
    enable: boolean
}
export type TMessageConsole = {
    type: EBridgeMessageType.CONSOLE
    method: keyof typeof console
    payload: any
}

export type TPaykeyResponse = {
    meta: { api_request_id: string; api_request_timestamp: string }
    data: {
        bank_data: {
            routing_number: string
            account_number: string
            account_type: string
        }
        created_at: string
        customer_id: string
        id: string
        institution_name: string
        label: string
        paykey: string
        source: string
        status: string
        updated_at: string
    }
    response_type: 'object'
}
export type TMessage = TBaseMessage | TMessageInitialize | TPaykeyMessage | TMessageDebug | TMessageConsole

export type TMode = 'production' | 'sandbox'

export enum EBridgeMessageType {
    PING = '@straddleio/js-bridge/ping',
    ERROR = '@straddleio/js-bridge/error',
    INITIALIZE = '@straddleio/js-bridge/initialize',
    INITIALIZING = '@straddleio/js-bridge/initializing',
    INITIALIZED = '@straddleio/js-bridge/initialized',
    MOUNTED = '@straddleio/js-bridge/mounted',
    ON_PAYKEY = '@straddleio/js-bridge/on-paykey',
    ON_SUCCESS = '@straddleio/js-bridge/on-success',
    ON_SUCCESS_CTA_CLICKED = '@straddleio/js-bridge/on-success-cta-clicked',
    ON_CLOSE = '@straddleio/js-bridge/on-close',
    ON_MANUAL_ENTRY = '@straddleio/js-bridge/on-manual-entry',
    ON_RETRY = '@straddleio/js-bridge/on-retry',
    TOKEN = '@straddleio/js-bridge/token',
    DEBUG = '@straddleio/js-bridge/debug',
    CONSOLE = '@straddleio/js-bridge/console',
}
