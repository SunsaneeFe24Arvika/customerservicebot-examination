import { ChatOllama } from '@langchain/ollama';

export const llm = new ChatOllama({
    model : "nomic-embed-text:latest"
});