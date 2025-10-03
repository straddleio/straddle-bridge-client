# @straddlecom/bridge-react

## Overview

`@straddlecom/bridge-react` is a React component that integrates Straddle's services into your React applications. It provides a seamless way to embed the Straddle widget and handle events within your React components.

## Installation

Install the package using npm:

```bash
npm install @straddlecom/bridge-react
```

Or using yarn:

```bash
yarn add @straddlecom/bridge-react
```

## Usage

Here's an example of how to use `@straddlecom/bridge-react` in your application:

```tsx
import React, { useState } from 'react'
import { StraddleBridge } from '@straddlecom/bridge-react'
import { TOnSuccessParams, TOnLoadErrorParams } from '@straddlecom/bridge-core'

const StraddleBridgeController = () => {
    const [open, setOpen] = useState(true)
    const token = 'your-authentication-token' // replace with your token
    const mode = 'sandbox' // 'production' or 'sandbox'

    const handleSuccess = (data: TOnSuccessParams) => {
        console.log('Success event, paykey data is:', data)
    }

    const handleSuccessCTAClicked = () => {
        console.log('Success CTA clicked (after a success, when the user clicks the CTA button)')
        setOpen(false)
    }

    const handleClose = () => {
        console.log('Straddle widget closed')
    }

    const handleLoadError = (error: TOnLoadErrorParams) => {
        console.error('Error loading Straddle Bridge Widget', error)
    }

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Straddle Widget</button>
            <StraddleBridge
                token={token}
                onSuccess={handleSuccess}
                mode={mode}
                open={open}
                onSuccessCTAClicked={handleSuccessCTAClicked}
                onClose={handleClose}
                onLoadError={handleLoadError}
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: 2147483647,
                }}
            />
        </div>
    )
}

export default StraddleBridgeController
```

### Props

-   **token**: (Required) Authentication token obtained from Straddle's API.
-   **onSuccess**: (Required) Callback function invoked when the operation is successful. This is how you can access the Paykey. When this event is triggered, the user will see a confirmation page, with a CTA button.
-   **mode**: (Required) Possible values: `production`, `sandbox`. Defaults to `sandbox`.
-   **open**: (Optional) Boolean indicating whether the Straddle widget should be displayed. Defaults to `true`.
-   **onSuccessCTAClicked**: (Optional) Callback function invoked when the CTA (Call to Action) button is clicked. This is on the confirmation page, after a paykey is generated successfully.
-   **onClose**: (Optional) Callback function invoked when the Straddle widget is closed.
-   **onLoadError**: (Optional) Callback function invoked when there's an error loading the Straddle iframe, or in case of an invalid token.
-   **onManualEntry**: (Optional) Callback function invoked when the user clicks the manual entry button.
-   **onRetry**: (Optional) Callback function invoked when the user clicks the retry button.
-   **ref**: (Optional) Ref to attach the iframe to a specific DOM element. If not passed, the iframe will be appended to the body.
-   **style**: (Optional) Custom styles for the iframe containing the Straddle widget. If passed, it should be an object with CSS properties, and will replace any default style. If not passed, the widget will fill the whole screen with a very high z-index.
-   **className**: (Optional) Custom class names for styling the iframe. This will not replace the default styling, if you want no style to be applied you must pass an empty object as style.
-   **verbose**: (Optional) Boolean indicating whether to log verbose messages to the console. Warnings and errors will be logged regardless of this setting.

## API Reference

For integration with the Straddle widget, please refer to the [Straddle API Documentation](https://docs.straddle.com/guides/bridge/widget).
For detailed API documentation, please refer to the [Straddle API Documentation](https://docs.straddle.com/api-reference/bridge/session).

## Troubleshooting

If you encounter issues with the Straddle widget, you can try the following:

-   Check if the token is valid.
-   Check if the widget is loaded correctly.
-   Check if there are errors in the network tab.
-   Set verbose to true, and check if there are errors in the console.
-   If you're still stuck, come chat with us on [Slack](https://strddl.co/mmunity). We're here to help!

## License

This project is licensed under the MIT License.
