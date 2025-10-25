import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from '@langchain/ollama';
import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { readFile } from 'fs/promises';
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

const file = '';

try {
    const text = await readFile(`${process.cwd()}/info.txt`, "utf-8");

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize : 500,
        separators : ["\n\n", "\n", " ", ""],
        chunkOverlap : 50
    });


    const splittedText = await textSplitter.createDocuments([text]);

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

    await SupabaseVectorStore.fromDocuments(
        splittedText,
        new OllamaEmbeddings({
            model : "nomic-embed-text:latest"
        }), {
            client : supabaseClient,
            tableName : 'documents'
        }
    );

    console.log('Success');
    
} catch(error) {
    console.log('ERROR:', error.message);
    
}