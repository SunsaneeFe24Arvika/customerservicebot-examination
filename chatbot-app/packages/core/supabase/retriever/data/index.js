import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { client } from '@chatbot-app/client';

const embeddings = new OllamaEmbeddings({
    model: "llama3.1:8b"
});

const vectorstore = new SupabaseVectorStore(
    embeddings, 
    {
        client: client,
        tableName: 'documents',
        queryName: 'match_documents'
    }
);

export const retriever = vectorstore.asRetriever();