
export const validateLanguage = (detectedLanguage, originalQuestion) => {
    const supportedLanguages = ['english', 'svenska'];
    
    if (!supportedLanguages.includes(detectedLanguage)) {
        console.warn("Unsupported language detected:", detectedLanguage);
        
        // Försök detektera manuellt baserat på vanliga ord
        const questionLower = originalQuestion.toLowerCase();
        
        // Engelska
        const englishWords = /\b(hello|hi|how|can|what|when|where|why|please|thank|you|order|help|price|cost|buy|payment|delivery)\b/i;
        
        // Svenska  
        const swedishWords = /\b(hej|hejsan|hur|kan|vad|när|var|varför|tack|beställa|hjälpa|pris|kosta|köpa|betalning|leverans|tja|hallå)\b/i;
        
        if (englishWords.test(questionLower)) {
            console.log("Manual detection: English words found");
            return 'english';
        } else if (swedishWords.test(questionLower)) {
            console.log("Manual detection: Swedish words found");
            return 'svenska';
        } else {
            console.log("Language detection failed completely");
            return 'UNSUPPORTED_LANGUAGE';
        }
    }
    
    return detectedLanguage;
};


export const isSupportedLanguage = (language) => {
    const supportedLanguages = ['english', 'svenska'];
    return supportedLanguages.includes(language);
};

export const SUPPORTED_LANGUAGES = ['english', 'svenska'];