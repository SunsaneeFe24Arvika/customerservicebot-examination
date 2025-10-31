import { useState, useRef } from "react";
import { chain } from '@chatbot-app/chains';

export const useChatLogic = (showWelcome = false) => {
    // Välkomstmeddelande
    const [messages, setMessages] = useState(() => {
        if (showWelcome) {
            return [{
                text: "Hej och välkommen till vår Novis AI! Vad kan vi hjälpa dig med idag?",
                role: "Novis"
            }];
        }
        return [];
    });
    
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const question = inputRef.current.value;
        if (!question.trim()) return;

        setLoading(true);
        setMessages((prev) => [...prev, { text: question, role: 'user'}]);
        inputRef.current.value = '';
        const answer = await chain.invoke({question}, { configurable : { sessionId : 'Hejsan!'}});

        setMessages((prev) => [
            ...prev,
            {role: 'Novis', text: answer.response || 'Ingen response.'},
        ]);

        setLoading(false);
    };

    const clearMessages = () => {
        if (showWelcome) {
            setMessages([{
                text: "Hej och välkommen till vår Novis AI! Vad kan vi hjälpa dig med idag?",
                role: "Novis"
            }]);
        } else {
            setMessages([]);
        }
    };

    return { messages, loading, handleSubmit, inputRef, clearMessages };
};