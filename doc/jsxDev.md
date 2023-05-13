# 实现jsx

## jsx定义

jsx会通过babel转换 www.babeljs.cn/repl


## jsxDev
```js

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/*#__PURE__*/_jsxs("h1", {
  children: ["hello", /*#__PURE__*/_jsx("span", {
    style: {
      color: 'red'
    },
    children: "world"
  })]
});
```
### ReactElement

```js

/*#__PURE__*/React.createElement("h1", null, "hello", /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'red'
  }
}, "world"));

```