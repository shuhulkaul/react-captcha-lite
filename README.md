# react-captcha-lite Documentation

## Overview

The CaptchaBox component is a React functional component that renders a CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) box. It generates a random string based on specified criteria and displays it on an HTML5 canvas element. The component also provides a button to reload and generate a new CAPTCHA string.
PropTypes

The CaptchaBox component accepts the following props:

- width (number): The width of the CAPTCHA canvas. Default is 200.
- height (number): The height of the CAPTCHA canvas. Default is 60.
- fontColor (string): The color of the CAPTCHA text. Default is "#000".
- boxBorder (string): The CSS border property for the CAPTCHA box. Default is "2px solid grey".
- boxBackground (string): The background color of the CAPTCHA box. Default is "#fff".
- textType (string): The type of characters used in the CAPTCHA text. It can be one of: "UPPER_TEXT"
  "LOWER_TEXT"
  "UPPER_TEXT_NUM"
  "LOWER_TEXT_NUM"
  "NUM_ONLY"
  "MIXED"
- charLength (number): The length of the CAPTCHA text. Default is 6.
- reloadStyle (object): Inline styles for the reload button.
- containerStyle (object): Inline styles for the container div. Default is an object with flexbox properties.

## Usage

```javascript
import { CaptchaBox, validateCaptcha, reloadCaptcha } from "./CaptchaBox";
```

## Example

```javascript
import React from "react";
import { CaptchaBox, validateCaptcha } from "./CaptchaBox";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.captchaInput.value;
    if (validateCaptcha(userInput)) {
      alert("CAPTCHA validation successful");
    } else {
      alert("CAPTCHA validation failed");
    }
  };

  return (
    <div>
      <CaptchaBox />
      <form onSubmit={handleSubmit}>
        <input type="text" name="captchaInput" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
```
