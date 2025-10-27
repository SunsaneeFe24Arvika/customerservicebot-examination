import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@chatbot-app/startpage': path.resolve(__dirname, 'packages/pages/startpage'),
      '@chatbot-app/chatpage': path.resolve(__dirname, 'packages/pages/chatpage'),
      '@chatbot-app/router': path.resolve(__dirname, 'packages/core/router'),
      '@chatbot-app/button': path.resolve(__dirname, 'packages/base/button'),
      '@chatbot-app/chat': path.resolve(__dirname, 'packages/base/chat'),
      '@chatbot-app/chatmodal': path.resolve(__dirname, 'packages/base/chatmodal'),
      '@chatbot-app/message': path.resolve(__dirname, 'packages/base/message'),
      '@chatbot-app/loading': path.resolve(__dirname, 'packages/base/loading'),
      '@chatbot-app/useChat': path.resolve(__dirname, 'packages/core/hooks/useChat'),
    }
  }
})
