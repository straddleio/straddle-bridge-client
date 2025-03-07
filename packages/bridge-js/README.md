# @straddleio/bridge-js

## Overview

`@straddleio/bridge-js` is a JavaScript library that provides a bridge to integrate Straddle's services into your web applications. It facilitates communication between your application and Straddle's platform through an iframe, allowing you to easily initialize and manage the Straddle widget.

## Installation

Install the package using npm:

```bash
npm install @straddleio/bridge-js
```

Or using yarn:

```bash
yarn add @straddleio/bridge-js
```

## Usage

Here's an example of how to use `@straddleio/bridge-js` in your application:

```javascript
import { straddleBridge } from '@straddleio/bridge-js'

straddleBridge.init({
    mode: 'sandbox', // 'production' or 'sandbox'
    token: 'your-authentication-token', // replace with your token
    onSuccess: (payload) => {
        console.log('Success event, paykey data is:', data)
    },
    onSuccessCTAClicked: () => {
        console.log('Success CTA clicked')
    },
    onClose: () => {
        console.log('Straddle widget closed')
    },
    onLoadError: (error) => {
        console.error('Error loading Straddle Bridge Widget', error)
    },
    onManualEntry: () => {
        console.log('Manual entry event')
    },
    onRetry: () => {
        console.log('Retry event')
    },
    style: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        top: '200px',
        left: '0',
    },
    debug: true,
})
```

### Parameters

-   **token**: (Required) Authentication token obtained from Straddle's API.
-   **onSuccess**: (Required) Callback function invoked when the operation is successful. This is how you can access the Paykey.
-   **mode**: (Required) Possible values: production, sandbox.
-   **onSuccessCTAClicked**: (Optional) Callback function invoked when the CTA (Call to Action) button is clicked.
-   **onClose**: (Optional) Callback function invoked when the Straddle widget is closed.
-   **onLoadError**: Callback function invoked when there's an error loading the Straddle iframe.
-   **onManualEntry**: (Optional) Callback function invoked when the user clicks the manual entry button.
-   **onRetry**: (Optional) Callback function invoked when the user clicks the retry button.
-   **targetRef**: (Optional) Reference to the HTML element where the Straddle widget should be appended. If not passed, the widget will be appended to the body.
-   **style**: (Optional) Custom styles for the iframe containing the Straddle widget. If passed, it should be an object with CSS properties, and will replace any default style. If not passed, the widget will fill the whole screen.
-   **className**: (Optional) Custom class names for styling the iframe. This will not replace the default styling, if you want no style to be applied you must pass an empty object as style.

### Methods

-   **straddleBridge.show()**: Displays the Straddle widget iframe.
-   **straddleBridge.hide()**: Hides the Straddle widget iframe.
-   **straddleBridge.remove()**: Removes the Straddle widget iframe from the DOM.
-   **straddleBridge.send(message)**: Sends a custom message to the Straddle widget.

### Debugging

You can enable or disable debug mode:

```javascript
straddleBridge.debug.enable()
straddleBridge.debug.disable()
```

## API Reference

For detailed API documentation, please refer to the [Straddle API Documentation](https://docs.straddle.io/guides/bridge/widget).

## License

This project is licensed under the MIT License.

---
