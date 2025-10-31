import './index.css';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";


export const ChatButton = ({ onClick }) => {

    const handleChatPage = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button 
            className="chat-button" 
            onClick={handleChatPage}
            aria-label="Öppna chat"
        >
            <IoChatbubbleEllipsesOutline />
        </button>
    );
};