export var EBridgeMessageType;
(function (EBridgeMessageType) {
    EBridgeMessageType["PING"] = "@straddleio/js-bridge/ping";
    EBridgeMessageType["ERROR"] = "@straddleio/js-bridge/error";
    EBridgeMessageType["INITIALIZE"] = "@straddleio/js-bridge/initialize";
    EBridgeMessageType["INITIALIZING"] = "@straddleio/js-bridge/initializing";
    EBridgeMessageType["INITIALIZED"] = "@straddleio/js-bridge/initialized";
    EBridgeMessageType["MOUNTED"] = "@straddleio/js-bridge/mounted";
    EBridgeMessageType["ON_PAYKEY"] = "@straddleio/js-bridge/on-paykey";
    EBridgeMessageType["ON_SUCCESS"] = "@straddleio/js-bridge/on-success";
    EBridgeMessageType["ON_SUCCESS_CTA_CLICKED"] = "@straddleio/js-bridge/on-success-cta-clicked";
    EBridgeMessageType["ON_CLOSE"] = "@straddleio/js-bridge/on-close";
    EBridgeMessageType["ON_MANUAL_ENTRY"] = "@straddleio/js-bridge/on-manual-entry";
    EBridgeMessageType["ON_RETRY"] = "@straddleio/js-bridge/on-retry";
    EBridgeMessageType["TOKEN"] = "@straddleio/js-bridge/token";
    EBridgeMessageType["DEBUG"] = "@straddleio/js-bridge/debug";
    EBridgeMessageType["CONSOLE"] = "@straddleio/js-bridge/console";
})(EBridgeMessageType || (EBridgeMessageType = {}));
