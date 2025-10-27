import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StarPage } from '@chatbot-app/startpage';
import { ChatPage } from '@chatbot-app/chatpage';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StarPage />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </Router>
    );
};