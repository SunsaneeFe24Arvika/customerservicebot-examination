import { RunnableSequence } from "@langchain/core/runnables";
import { retriever } from "@chatbot-app/retriever";
import { standaloneQuestionTemplate, answerTemplateSwedish, answerTemplateEnglish, languageDetectionTemplate } from "@chatbot-app/templates";
import { llm } from "@chatbot-app/llm";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { validateLanguage } from "@chatbot-app/language-validator";


const combineDocuments = (docs) => {
    return docs.map(doc => doc.pageContent).join("\n\n");
};

// Enkel chat history storage
let chatHistory = [];



// Funktion för att rensa minnet
export const clearMemory = () => {
    chatHistory = [];
};

// Identifiera språket i frågan
const languageDetectionChain = RunnableSequence.from([
    languageDetectionTemplate,
    llm,
    new StringOutputParser(),
    (output) => {
        const cleaned = output.trim().toLowerCase();
        console.log("Language detection raw output:", output);
        console.log("Language detection cleaned:", cleaned);
        
        // Extrahera språket mer robust
        if (cleaned.includes('english') || cleaned.includes('en')) {
            return 'english';
        } else if (cleaned.includes('svenska') || cleaned.includes('sv')) {
            return 'svenska';
        } else {
            // Returnera 'unknown' istället för att gissa
            console.warn("Could not determine language from AI response:", cleaned);
            return 'unknown';
        }
    }
]);

// 1. Konvertera frågan till en standalone question
const standaloneQuestionChain = RunnableSequence.from([
    standaloneQuestionTemplate,
    llm,
    new StringOutputParser()
]);

// 2. Enkel retriever chain med combineDocuments
const retrieverChain = RunnableSequence.from([
    (data) => {
        return data.standaloneQuestion;
    },
    retriever,
    combineDocuments
]);

// Huvudchain
export const chain = RunnableSequence.from([
    async (input) => {
        // Logga input
        console.log("Initial input:", input);

        // 0. Språkdetektion
        const detectedLanguage = await languageDetectionChain.invoke(input);
        console.log("Detected language:", detectedLanguage);
        
        // Validera språket
        console.log("About to validate language:", detectedLanguage, "for question:", input.question);
        const validatedLanguage = validateLanguage(detectedLanguage, input.question);
        console.log("Validated language:", validatedLanguage);
        
        // Kontrollera om språket stöds
        if (validatedLanguage === 'UNSUPPORTED_LANGUAGE') {
            return {
                error: true,
                response: "Sorry, I can only assist in Swedish (svenska) or English. Please rephrase your question. / Tyvärr kan jag bara hjälpa på svenska eller engelska. Vänligen omformulera din fråga."
            };
        }

        // 1. Standalone question
        const standaloneQuestion = await standaloneQuestionChain.invoke({
            question: input.question,
            language: validatedLanguage
        });
        console.log("Standalone question:", standaloneQuestion);

        // 2. Retriever context
        const context = await retrieverChain.invoke({ standaloneQuestion });
        console.log("Retrieved context:", context);

        return {
            detectedLanguage: validatedLanguage,
            standaloneQuestion,
            context,
            chat_history: chatHistory
        };
    },
    async (input) => {
        try {
            console.log("Final step input:", input);
            
            // Kontrollera om det är ett felmeddelande från språkvalidering
            if (input.error) {
                console.log("Language validation error, returning error message");
                return { response: input.response };
            }
            
            console.log("Detected language:", input.detectedLanguage);

            const language = input.detectedLanguage || "svenska";
            console.log("Final language:", language);

            // Välj rätt template baserat på språk
            const template = (language === 'english') ? answerTemplateEnglish : answerTemplateSwedish;
            console.log("Using template:", language === 'english' ? 'English' : 'Swedish');

            // Formatera prompt för LLM
            const promptText = await template.format({
                context: input.context,
                question: input.standaloneQuestion,
                chat_history: input.chat_history
            });

            const answerResponse = await llm.invoke(promptText);

            // Spara i chat history
            chatHistory.push(
                { role: "user", content: input.standaloneQuestion },
                { role: "assistant", content: answerResponse.content || answerResponse }
            );

            return { response: answerResponse.content || answerResponse };
        } catch (error) {
            console.error("Error in final step:", error);
            return { response: "Sorry, I encountered an error. Please try again." };
        }
    }
]);