import './index.css';
import { Chat } from '@chatbot-app/chat';
import { IoClose } from "react-icons/io5";

export const ChatModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="chat-modal-backdrop" onClick={handleBackdropClick}>
            <div className="chat-modal">
                <div className="chat-modal__header">
                    <h3>Chatta med Novis</h3>
                    <button 
                        className="chat-modal__close-btn" 
                        onClick={onClose}
                        aria-label="Stäng chat"
                    >
                        <IoClose />
                    </button>
                </div>
                <div className="chat-modal__content">
                    <Chat />
                </div>
            </div>
        </div>
    );
};