# @straddleio/bridge-react

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
    const mode = 'sandbox' // 'production' or 'sandbox'

    const handleSuccess = (data: TPaykeyResponse) => {
        console.log('Success event, paykey data is:', data)
    }

    const handleSuccessCTAClicked = () => {
        console.log('Success CTA clicked (after a success, when the user clicks the CTA button)')
        setOpen(false)
    }

    const handleClose = () => {
        console.log('Straddle widget closed')
    }

    const handleLoadError = (error: any) => {
        console.error('Error loading Straddle Bridge Widget', error)
    }

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Straddle Widget</button>
            {open && (
                <StraddleBridge
                    mode={mode}
                    token={token}
                    onSuccess={handleSuccess}
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
            )}
        </div>
    )
}

export default StraddleBridgeController
```

### Props

-   **token**: (Required) Authentication token obtained from Straddle's API.
-   **onSuccess**: (Required) Callback function invoked when the operation is successful. This is how you can access the Paykey.
-   **mode**: (Required) Possible values: production, sandbox.
-   **open**: (Optional) Boolean indicating whether the Straddle widget should be displayed.
-   **onSuccessCTAClicked**: (Optional) Callback function invoked when the CTA (Call to Action) button is clicked.
-   **onClose**: (Optional) Callback function invoked when the Straddle widget is closed.
-   **onLoadError**: (Optional) Callback function invoked when there's an error loading the Straddle iframe.
-   **onManualEntry**: (Optional) Callback function invoked when the user clicks the manual entry button.
-   **onRetry**: (Optional) Callback function invoked when the user clicks the retry button.
-   **ref**: (Optional) Ref to attach the iframe to a specific DOM element. If not passed, the iframe will be appended to the body.
-   **style**: (Optional) Custom styles for the iframe containing the Straddle widget. If passed, it should be an object with CSS properties, and will replace any default style. If not passed, the widget will fill the whole screen.
-   **className**: (Optional) Custom class names for styling the iframe. This will not replace the default styling, if you want no style to be applied you must pass an empty object as style.

## API Reference

For detailed API documentation, please refer to the [Straddle API Documentation](https://docs.straddle.io/guides/bridge/widget).

## License

This project is licensed under the MIT License.
