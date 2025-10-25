import './index.css';
import { Message } from '@chatbot-app/message';
import { Loading } from '@chatbot-app/loading';
import { useChatLogic } from '@chatbot-app/useChat';


export const Chat = () => {
    const { messages, loading, handleSubmit, inputRef } = useChatLogic();
}