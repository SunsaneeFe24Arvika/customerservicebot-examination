//import './index.css';
import logo from '../../../../src/assets/techNova-3.png';
import { ChatButton } from '@chatbot-app/button';
import { ChatModal } from '@chatbot-app/chatmodal';
import { useState } from 'react';

export const StarPage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    const handleChatOpen = () => {
        setIsChatOpen(true);
    };

    const handleChatClose = () => {
        setIsChatOpen(false);
    };

    return (
        <section className="start-page">
            <img src={logo} alt="TechNova Logo" className="logo" />
            <ChatButton onClick={handleChatOpen} />
            <ChatModal isOpen={isChatOpen} onClose={handleChatClose} />
        </section>
    )
}