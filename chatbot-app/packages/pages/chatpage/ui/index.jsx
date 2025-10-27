import './index.css';
import { Chat } from '@chatbot-app/chat';
import { useNavigate } from 'react-router-dom';


export const ChatPage = () => {
    const navigate = useNavigate();
    
    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <section className='chat-page'>
            <Chat />
        </section>
    )
}