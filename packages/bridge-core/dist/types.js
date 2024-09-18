export var EBridgeMessageType;
(function (EBridgeMessageType) {
    EBridgeMessageType["PING"] = "@straddleio/js-bridge/ping";
    EBridgeMessageType["ERROR"] = "@straddleio/js-bridge/error";
    EBridgeMessageType["INITIALIZE"] = "@straddleio/js-bridge/initialize";
    EBridgeMessageType["INITIALIZING"] = "@straddleio/js-bridge/initializing";
    EBridgeMessageType["INITIALIZED"] = "@straddleio/js-bridge/initialized";
    EBridgeMessageType["MOUNTED"] = "@straddleio/js-bridge/mounted";
    EBridgeMessageType["ON_PAYKEY"] = "@straddleio/js-bridge/on-wallet-token";
    EBridgeMessageType["ON_SUCCESS"] = "@straddleio/js-bridge/on-success";
    EBridgeMessageType["ON_SUCCESS_CTA_CLICKED"] = "@straddleio/js-bridge/on-success-cta-clicked";
    EBridgeMessageType["TOKEN"] = "@straddleio/js-bridge/token";
    EBridgeMessageType["DEBUG"] = "@straddleio/js-bridge/debug";
})(EBridgeMessageType || (EBridgeMessageType = {}));
