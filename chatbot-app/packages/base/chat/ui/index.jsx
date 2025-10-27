import './index.css';
import { Message } from '@chatbot-app/message';
import { Loading } from '@chatbot-app/loading';
import { useChatLogic } from '@chatbot-app/useChat';
import { IoIosPaperPlane } from "react-icons/io";

export const Chat = () => {
    const { messages, loading, handleSubmit, inputRef } = useChatLogic();

    const messageComponents = messages.map((message, index) => (
        <Message text={message.text} role={message.role} key={index} />
    ));

    return (
        <section className="chat">
            <section className="chat__messages">
                {messageComponents}
                {loading && <Loading />}
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
    )
}