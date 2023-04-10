# React Typing Dynamics

A simple and customizable React component for simulating typing animations.

NPM Package: ![](https://www.npmjs.com/package/react-typing-dynamics)

## Installation

Using npm:

```bash
npm install react-typing-dynamics
```

Using yarn:

```bash
yarn add react-typing-dynamics
```

## How to use
Here's a basic **example** of how to use the TextAnimation component from **react-typing-dynamics**:


```jsx
import React from 'react';
import TextAnimation from 'react-typing-dynamics';

const App = () => {
  const phrases = ['Hello, World!', '<h1>Welcome to my website.</h1>', 'Enjoy your stay!'];

  return (
    <TextAnimation
      phrases={phrases}
      typingSpeed={200}
      backspaceDelay={50}
      eraseDelay={1000}
      timeComplete={3000}
      errorProbability={0.1}
      isSecure={true}
    />
  );
};

export default App;

```
## Props
| Prop Name | Type | Description |
| --- | --- | --- |
| `phrases` | `string[]` | An array of phrases to be typed. Can be HTML or String |
| `typingSpeed` | `number` | The typing speed in characters per second. |
| `backspaceDelay` | `number` | The delay in milliseconds before the text starts to be erased. |
| `eraseDelay` | `number` | The delay in milliseconds between each character erasing. |
| `timeComplete` | `number` | The delay in milliseconds before the typing animation restarts. |
| `errorProbability` | `number` | The probability (between 0 and 1) of a typing error happening. |
| `isSecure` | `boolean` | If `true`, the text is sanitized with `sanitize-html`. |

### License
```
This project is licensed under the MIT License - see the LICENSE file for details.
```