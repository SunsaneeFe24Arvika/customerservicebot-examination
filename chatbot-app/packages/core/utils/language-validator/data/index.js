
export const validateLanguage = (detectedLanguage, originalQuestion) => {
    const supportedLanguages = ['english', 'svenska'];
    
    // ALLTID kolla med regex först
    const questionLower = originalQuestion.toLowerCase();
    
    // Svenska ord 
    const swedishWords = /\b(hej|hejsan|hur|kan|vad|när|var|varför|tack|beställa|hjälpa|pris|kosta|köpa|betalning|leverans|tja|hallå|gör|inte|var|nöjd|med|som|jag|hade|beställt|från|er|och|eller|för|att|om|är|det|ska|kommer|finns|någon|tid|dag|vecka|måndag|tisdag|onsdag|torsdag|fredag|lördag|söndag|vill|har|hade|måste|månad|år)\b/i;
    
    // Engelska ord  
    const englishWords = /\b(hello|hi|how|can|what|when|where|why|please|thank|you|order|help|price|cost|buy|payment|delivery|and|or|for|to|if|is|it|will|come|have|any|time|day|week|monday|tuesday|wednesday|thursday|friday|saturday|sunday|we|they|use)\b/i;
    
    // Räkna matchningar
    const swedishMatches = (questionLower.match(swedishWords) || []).length;
    const englishMatches = (questionLower.match(englishWords) || []).length;
    
    console.log(`Manual language detection:
    Swedish matches: ${swedishMatches}
    English matches: ${englishMatches}
    AI detected: ${detectedLanguage}`);
    
    // Om frågan har tydliga svenska ord, använd svenska
    if (swedishMatches > englishMatches && swedishMatches > 0) {
        console.log("Manual detection: Overriding AI - Swedish words dominate");
        return 'svenska';
    }
    
    // Om frågan har tydliga engelska ord, använd engelska  
    if (englishMatches > swedishMatches && englishMatches > 0) {
        console.log("Manual detection: Overriding AI - English words dominate");
        return 'english';
    }
    
    // Fall back på AI:ns detektion om frågan matchar inte med regex
    if (supportedLanguages.includes(detectedLanguage)) {
        console.log("Using AI detection as fallback");
        return detectedLanguage;
    }
    
    // Sista utväg
    console.log("Language detection failed completely");
    return 'UNSUPPORTED_LANGUAGE';
};

