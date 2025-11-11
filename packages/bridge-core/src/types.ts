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

export type TErrorMessage = {
    type: EBridgeMessageType.ERROR
    payload?: {
        error_code?: string
        message?: string
    }
}

export type TMessage = TBaseMessage | TMessageInitialize | TPaykeyMessage | TMessageDebug | TMessageConsole | TErrorMessage

export type TMode = 'production' | 'sandbox'

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

export enum EBridgeMessageType {
    PING = '@straddlecom/js-bridge/ping',
    ERROR = '@straddlecom/js-bridge/error',
    INITIALIZE = '@straddlecom/js-bridge/initialize',
    INITIALIZING = '@straddlecom/js-bridge/initializing',
    INITIALIZED = '@straddlecom/js-bridge/initialized',
    MOUNTED = '@straddlecom/js-bridge/mounted',
    ON_PAYKEY = '@straddlecom/js-bridge/on-paykey',
    ON_SUCCESS = '@straddlecom/js-bridge/on-success',
    ON_SUCCESS_CTA_CLICKED = '@straddlecom/js-bridge/on-success-cta-clicked',
    ON_CLOSE = '@straddlecom/js-bridge/on-close',
    ON_MANUAL_ENTRY = '@straddlecom/js-bridge/on-manual-entry',
    ON_RETRY = '@straddlecom/js-bridge/on-retry',
    TOKEN = '@straddlecom/js-bridge/token',
    DEBUG = '@straddlecom/js-bridge/debug',
    CONSOLE = '@straddlecom/js-bridge/console',
}

export type TOnLoadErrorParams = { error_code: 'iframe_error'; error: ErrorEvent; message: string } | { error_code: 'init_error'; message: any; origin: string }
export type TOnSuccessParams = TPaykeyResponse
