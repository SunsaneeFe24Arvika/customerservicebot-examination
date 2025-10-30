import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { client } from '@chatbot-app/client';

const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text:latest"
});

const vectorstore = new SupabaseVectorStore(
    embeddings, 
    {
        client: client,
        tableName: 'documents',
        queryName: 'match_documents'
    }
);

// Standard retriever
export const retriever = vectorstore.asRetriever();

// Språkspecifik retriever 
export const getLanguageSpecificRetriever = (language) => {
    // Skapa en ny vectorstore för varje språk
    const languageVectorstore = new SupabaseVectorStore(
        embeddings, 
        {
            client: client,
            tableName: 'documents',
            queryName: 'match_documents'
        }
    );
    
    // Returnera retriever med språkfilter
    return languageVectorstore.asRetriever({
        k: 4,
        filter: { language: language }
    });
};