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
    appUrl: '', // replace with the actual URL
    token: 'your-authentication-token', // replace with your token
    onSuccess: (payload) => {
        console.log('Success event:', payload)
    },
    onSuccessCTAClicked: () => {
        console.log('Success CTA clicked')
    },
    onPaykey: (payload) => {
        console.log('Paykey event:', payload)
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

-   **appUrl**: The URL of your Straddle application.
-   **token**: Authentication token obtained from Straddle's API.
-   **onSuccess**: Callback function invoked when the operation is successful.
-   **onSuccessCTAClicked**: Callback function invoked when the CTA (Call to Action) button is clicked.
-   **onPaykey**: Callback function invoked when a paykey event occurs.
-   **style**: (Optional) Custom styles for the iframe containing the Straddle widget. If passed, it should be an object with CSS properties, and will replace any default style. If not passed, the widget will fill the whole screen.
-   **className**: (Optional) Custom class names for styling the iframe. This will not replace the default styling, if you want no style to be applied you must pass an empty object as style.
-   **debug**: (Optional) Enables debug mode if set to `true`.

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

For detailed API documentation, please refer to the [Straddle API Documentation](https://docs.straddle.io).

## License

This project is licensed under the MIT License.

---

# README for `@straddleio/bridge-react`

## Overview

`@straddleio/bridge-react` is a React component that integrates Straddle's services into your React applications. It provides a seamless way to embed the Straddle widget and handle events within your React components.

## Installation

Install the package using npm:

```bash
npm install @straddleio/bridge-react
```

Or using yarn:

```bash
yarn add @straddleio/bridge-react
```

## Usage

Here's an example of how to use `@straddleio/bridge-react` in your application:

```jsx
import React, { useState } from 'react'
import { StraddleBridge } from '@straddleio/bridge-react'

const StraddleBridgeController = () => {
    const [open, setOpen] = useState(true)
    const token = 'your-authentication-token' // replace with your token
    const appUrl = '' // replace with your real URL

    const handleSuccess = ({ paykey: string }) => {
        console.log('Success event, paykey is:', paykey)
    }

    const handleSuccessCTAClicked = () => {
        console.log('Success CTA clicked (after a success, when the user clicks the CTA button)')
        setOpen(false)
    }

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Straddle Widget</button>
            {open && (
                <StraddleBridge
                    appUrl={appUrl}
                    token={token}
                    onSuccess={handleSuccess}
                    onSuccessCTAClicked={handleSuccessCTAClicked}
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        zIndex: 2147483647,
                    }}
                />
            )}
        </div>
    )
}

export default StraddleBridgeController
```

### Props

-   **appUrl**: The URL of your Straddle application.
-   **token**: Authentication token obtained from Straddle's API.
-   **open**: Boolean indicating whether the Straddle widget should be displayed.
-   **onSuccess**: Callback function invoked when the operation is successful.
-   **onSuccessCTAClicked**: Callback function invoked when the CTA (Call to Action) button is clicked.
-   **style**: (Optional) Custom styles for the iframe containing the Straddle widget. If not passed, the widget will fill the whole screen. If passed, it should be an object with CSS properties, and will replace any default style.
-   **className**: (Optional) Custom class names for styling the iframe.
-   **ref**: (Optional) Ref to attach the iframe to a specific DOM element.

## API Reference

For detailed API documentation, please refer to the [Straddle API Documentation](https://docs.straddle.io).

## License

This project is licensed under the MIT License.
