import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { retriever } from "@chatbot-app/retriever";
import { standaloneQuestionTemplate, answerTemplate } from "@chatbot-app/templates";
import { combineDocuments } from "@chatbot-app/combinedocuments";
import { llm } from "@chatbot-app/llm";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { BufferMemory } from "lnagchain/memory";
import { ConversationChain } from "langchain/chains";

const memory = new BufferMemory({
    memoryKey : 'chat_history',
    returnMessages : true,
    inputKey : 'question'
});


// 1. Konvertera frågan till en standalone question
const standaloneQuestionChain = RunnableSequence.from([
    standaloneQuestionTemplate,
    llm,
    new StringOutputParser()
]);

// 2. Använda standalone question för att söka kontext från databasen
const retrieverChain = RunnableSequence.from([
    (data) => {
        return data.standaloneQuestion
    },
    retriever,
    combineDocuments
]);

const conversationChain = new ConversationChain({
    llm,
    promt : answerTemplate,
    memory
});

export const chain = RunnableSequence.from([
    {
        standaloneQuestion : standaloneQuestionChain,
        originalQuestion : new RunnablePassthrough()
    },
    {
        context : retrieverChain,
        question : ({ originalQuestion }) => originalQuestion.question
    },
    conversationChain
]);