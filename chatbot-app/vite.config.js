import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Pages
      '@chatbot-app/startpage': path.resolve(__dirname, 'packages/pages/startpage'),
      '@chatbot-app/chatpage': path.resolve(__dirname, 'packages/pages/chatpage'),
      
      // Core (router removed since not used)
      '@chatbot-app/useChat': path.resolve(__dirname, 'packages/core/hooks/useChat'),
      '@chatbot-app/chains': path.resolve(__dirname, 'packages/core/langchain/chains'),
      '@chatbot-app/llm': path.resolve(__dirname, 'packages/core/langchain/llm'),
      '@chatbot-app/templates': path.resolve(__dirname, 'packages/core/langchain/templates'),
      '@chatbot-app/client': path.resolve(__dirname, 'packages/core/supabase/client'),
      '@chatbot-app/retriever': path.resolve(__dirname, 'packages/core/supabase/retriever'),
      '@chatbot-app/combinedocuments': path.resolve(__dirname, 'package/core/utils/combinedocuments'),
      '@chatbot-app/language-validator': path.resolve(__dirname, 'packages/core/utils/language-validator'),
      
      // Base Components
      '@chatbot-app/button': path.resolve(__dirname, 'packages/base/button'),
      '@chatbot-app/chat': path.resolve(__dirname, 'packages/base/chat'),
      '@chatbot-app/chatmodal': path.resolve(__dirname, 'packages/base/chatmodal'),
      '@chatbot-app/message': path.resolve(__dirname, 'packages/base/message'),
      '@chatbot-app/loading': path.resolve(__dirname, 'packages/base/loading'),
    }
  }
})
