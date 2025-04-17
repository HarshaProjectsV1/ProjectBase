import React, { useState, useEffect } from 'react';
import './chat.css';
import { useAppContext } from '../../context/appContext';
import { supabase } from '../../supabaseClient';

const Chat = () => {
    const { messages, username, scrollToBottom, scrollRef } = useAppContext();
    const [input, setInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [receiverName, setReceiverName] = useState(() =>
        username === 'harsga6@gmail.com' ? 'harsga7@gmail.com' : 'harsga6@gmail.com'
    );

    useEffect(() => {
        if (messages.length === 0) {
            return;
        }

        const filteredMessages = messages.filter(
            (msg) => msg.sender_id === username || msg.receiver_id === username
        );
        setChatMessages(filteredMessages);

        const lastMessage = filteredMessages[filteredMessages.length - 1];
        if (lastMessage) {
            const receiver =
                lastMessage.sender_id === username
                    ? lastMessage.receiver_id
                    : lastMessage.sender_id;
            setReceiverName(receiver);
        }
    }, [messages, username]);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, scrollToBottom]);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessage = {
                sender_id: username,
                receiver_id: receiverName,
                message: input,
            };

            try {
                const { data, error } = await supabase
                    .from('messages')
                    .insert([newMessage]);

                if (error) {
                    return;
                }

                setChatMessages((prevMessages) => [...prevMessages, newMessage]);
                setInput('');
                scrollToBottom();
            } catch (err) {}
        }
    };

    return (
        <div className="chat-box">
            <header className="chat-header">
                <h2>Chat with {receiverName}</h2>
            </header>
            <main className="chat-body" ref={scrollRef}>
                <div className="chat-messages">
                    {chatMessages.length === 0 ? (
                        <p className="no-messages">No messages yet. Start the conversation!</p>
                    ) : (
                        chatMessages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${
                                    message.sender_id === username ? 'sent' : 'received'
                                }`}
                            >
                                <span className="chat-sender">
                                    {message.sender_id === username ? 'You' : message.sender_id}:
                                </span>
                                <span className="chat-text">{message.message}</span>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <footer className="chat-footer">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button onClick={handleSend} className="chat-send-button">
                    Send
                </button>
            </footer>
        </div>
    );
};

export default Chat;