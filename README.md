
#### 初始化项目

1. pnpm 脚手架创建

```js
pnpm create vite react18 --template react

```

2. 配制vite 配置文件

```js
import path from 'path'
import react from '@vitejs/plugin-react'


// 定义变量
  define: {
    __DEV__: true, // 设置为false跳过 if(__dev__)的开发逻辑
    __EXPERIMENTAL__: true,
    __PROFILE__: true,
  }


  //设置路径别名
  resolve: {
    
    alias: {
      "@": path.resolve(__dirname, "src"),
      react: path.resolve(__dirname, "src/react/packages/react"),
      "react-dom": path.resolve(__dirname, "src/react/packages/react-dom"),
      "react-dom-bindings": path.posix.resolve(
        "src/react/packages/react-dom-bindings"
      ),
      "react-reconciler": path.resolve(
        __dirname,
        "src/react/packages/react-reconciler"
      ),
      scheduler: path.resolve(__dirname, "src/react/packages/scheduler"),
      shared: path.resolve(__dirname, "src/react/packages/shared"),
    },
  }
```