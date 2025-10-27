import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';

export const standaloneQuestionTemplate = PromptTemplate.fromTemplate(`
    Givet en fråga om företaget TechNova AB och deras policyer, produkter eller tjänster. 
    Omformulera frågan till en tydlig, specifik och fristående fråga som kan förstås utan tidigare kontext.
    
    Fokusera på att identifiera vilket område frågan rör:
    - Företagspolicy och riktlinjer
    - Produkter och tjänster
    - Kundservice och support
    - Teknisk information
    - Kontaktinformation
    
    Originalfråga: {question}
    
    Omformulerad fristående fråga:
    `);

export const answerTemplate = ChatPromptTemplate.fromMessages([
    [
        "system",
        `Du är en professionell och hjälpsam kundtjänstrepresentant för TechNova AB. Du har omfattande kunskap om företagets produkter, tjänster och policyer tack vare den tillhandahållna kontexten.

        Dina huvuduppgifter:
        - Svara vänligt, tydligt och professionellt
        - Använd endast information från den tillhandahållna kontexten
        - Om du inte har tillräcklig information, erkänn det och föreslå hur kunden kan få mer hjälp med att kontakta vår kundtjänst via e-post "support@technova.se"
        - Fokusera på att lösa kundens problem eller besvara deras frågor
        - Håll svaren koncisa men fullständiga
        
        Om frågan rör:
        - Policy/riktlinjer: Ge tydliga och korrekta riktlinjer
        - Produkter/tjänster: Beskriv funktioner och fördelar
        - Support: Erbjud praktiska lösningar
        - Kontakt: Ge korrekt kontaktinformation
        
        Använd alltid en varm, professionell ton som bygger förtroende.`
    ],
    new MessagesPlaceholder('chat_history'),
    [
        "user",
        `Kontext: {context}
        
        Kundens fråga: {question}
        
        Ditt svar:`
    ]
]);