import './index.css';
import { Message } from '@chatbot-app/message';
import { Loading } from '@chatbot-app/loading';
import { useChatLogic } from '@chatbot-app/useChat';
import { IoIosPaperPlane } from "react-icons/io";
import { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';

export const Chat = forwardRef(({ showWelcome = true }, ref) => {
    const { messages, loading, handleSubmit, inputRef, clearMessages } = useChatLogic(showWelcome);
    const messagesEndRef = useRef(null);

    // Auto-scroll till botten när nya meddelanden läggs till
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "end" 
        });
    };

    // Scrolla när messages eller loading ändras
    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // Exponera clearMessages till parent komponenten
    useImperativeHandle(ref, () => ({
        clearMessages
    }));

    const messageComponents = messages.map((message, index) => (
        <Message text={message.text} role={message.role} key={index} />
    ));

    return (
        <section className="chat">
            <section className="chat__messages">
                {messageComponents}
                {loading && <Loading />}
                {/* Invisible element för att scrolla till */}
                <div ref={messagesEndRef} />
            </section>

            <form className="chat__form" onSubmit={handleSubmit}>
                <input type="text" className="chat__input" ref={inputRef} />
                <button className="chat__btn">
                    <i className="chat-icon">
                        <IoIosPaperPlane />
                    </i>                     
                </button>
            </form>
        </section>
    );
});