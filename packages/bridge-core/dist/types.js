export var EBridgeMessageType;
(function (EBridgeMessageType) {
    EBridgeMessageType["PING"] = "@straddlecom/js-bridge/ping";
    EBridgeMessageType["ERROR"] = "@straddlecom/js-bridge/error";
    EBridgeMessageType["INITIALIZE"] = "@straddlecom/js-bridge/initialize";
    EBridgeMessageType["INITIALIZING"] = "@straddlecom/js-bridge/initializing";
    EBridgeMessageType["INITIALIZED"] = "@straddlecom/js-bridge/initialized";
    EBridgeMessageType["MOUNTED"] = "@straddlecom/js-bridge/mounted";
    EBridgeMessageType["ON_PAYKEY"] = "@straddlecom/js-bridge/on-paykey";
    EBridgeMessageType["ON_SUCCESS"] = "@straddlecom/js-bridge/on-success";
    EBridgeMessageType["ON_SUCCESS_CTA_CLICKED"] = "@straddlecom/js-bridge/on-success-cta-clicked";
    EBridgeMessageType["ON_CLOSE"] = "@straddlecom/js-bridge/on-close";
    EBridgeMessageType["ON_MANUAL_ENTRY"] = "@straddlecom/js-bridge/on-manual-entry";
    EBridgeMessageType["ON_RETRY"] = "@straddlecom/js-bridge/on-retry";
    EBridgeMessageType["TOKEN"] = "@straddlecom/js-bridge/token";
    EBridgeMessageType["DEBUG"] = "@straddlecom/js-bridge/debug";
    EBridgeMessageType["CONSOLE"] = "@straddlecom/js-bridge/console";
})(EBridgeMessageType || (EBridgeMessageType = {}));
