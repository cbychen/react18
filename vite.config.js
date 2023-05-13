import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __DEV__: true, // 设置为false跳过 if(__dev__)的开发逻辑
    __EXPERIMENTAL__: true,
    __PROFILE__: true,
},
 
  resolve: {
    
    alias: {
      "@": path.resolve(__dirname, "src"),
      react: path.resolve(__dirname, "src/react/react"),
      "react-dom": path.resolve(__dirname, "src/react/react-dom"),
      "react-dom-bindings": path.posix.resolve(
        "src/react/react-dom-bindings"
      ),
      "react-reconciler": path.resolve(
        __dirname,
        "src/react/react-reconciler"
      ),
      scheduler: path.resolve(__dirname, "src/react/scheduler"),
      shared: path.resolve(__dirname, "src/react/shared"),
    },
  },
  plugins: [react()],
  optimizeDeps: {
    force: true,
  },
})