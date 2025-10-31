import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from '@langchain/ollama';
import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Konfigurera dotenv för att fungera på både Windows och macOS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

// Läs environment variables med rätt namn
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.VITE_SUPABASE_API_KEY || process.env.SUPABASE_API_KEY;

console.log('SUPABASE_URL:', SUPABASE_URL ? 'Loaded' : 'Missing');
console.log('SUPABASE_API_KEY:', SUPABASE_API_KEY ? 'Loaded' : 'Missing');

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    console.error('Environment variables are missing. Please check your .env file.');
    process.exit(1);
}

// Funktion för att ladda upp en fil med språkmetadata
async function uploadLanguageFile(filePath, language, supabaseClient, embeddings) {
    const text = await readFile(filePath, "utf-8");
    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        separators: ["\n\n", "\n", " ", ""],
        chunkOverlap: 50
    });

    const splittedText = await textSplitter.createDocuments([text]);
    
    // Lägg till språkmetadata till varje dokument
    const documentsWithMetadata = splittedText.map(doc => ({
        ...doc,
        metadata: {
            ...doc.metadata,
            language: language,
            source: `technova_faq_${language}`
        }
    }));

    await SupabaseVectorStore.fromDocuments(
        documentsWithMetadata,
        embeddings,
        {
            client: supabaseClient,
            tableName: 'documents'
        }
    );
    
    console.log(`✅ Successfully uploaded ${language} documents`);
}

try {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);
    const embeddings = new OllamaEmbeddings({
        model: "nomic-embed-text:latest"
    });

    // Ladda upp svenska versionen
    const swedishPath = join(__dirname, 'info.txt');
    await uploadLanguageFile(swedishPath, 'svenska', supabaseClient, embeddings);
    
    // Ladda upp engelska versionen
    const englishPath = join(__dirname, 'info_english.txt');
    await uploadLanguageFile(englishPath, 'english', supabaseClient, embeddings);

    console.log('🎉 Success! Both language versions uploaded');
    
} catch(error) {
    console.log('❌ ERROR:', error.message);
}