import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings, OllamaEmbeddings } from "@langchain/ollama";
import { client } from '@chatbot-app/client';

const OllamaEmbeddings = new OllamaEmbeddings({
    model : 'llama3.1:8b'
});

const vectorstores = new SupabaseVectorStore(
    embeddinds, 
    {
        client : client,
        tableName : 'documents',
        queryName : 'match_documents'
    }
);

export const retriever = vectorstores.asRetriever();