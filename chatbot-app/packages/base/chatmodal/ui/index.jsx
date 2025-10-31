import './index.css';
import { Chat } from '@chatbot-app/chat';
import { IoClose } from "react-icons/io5";
import { clearMemory } from '@chatbot-app/chains';
import { useRef } from 'react';

export const ChatModal = ({ isOpen, onClose }) => {
    const chatRef = useRef();
    
    if (!isOpen) return null;

    const handleClose = () => {
        // Rensa både memory och meddelanden
        clearMemory();
        if (chatRef.current) {
            chatRef.current.clearMessages();
        }
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className="chat-modal-backdrop" onClick={handleBackdropClick}>
            <div className="chat-modal">
                <div className="chat-modal__header">
                    <h3>Chatta med Novis AI</h3>
                    <button 
                        className="chat-modal__close-btn" 
                        onClick={handleClose} 
                        aria-label="Stäng chat"
                    >
                        <IoClose />
                    </button>
                </div>
                <div className="chat-modal__content">
                    <Chat ref={chatRef} showWelcome={true} />
                </div>
            </div>
        </div>
    );
};