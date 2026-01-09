import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';
import { Send } from 'lucide-react';

let socket;

const Chat = ({ conversationId }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    // Use user ID as room if generic support chat
    const roomId = conversationId || user?._id;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!user) return;

        socket = io('http://localhost:5000');
        socket.emit('join_room', roomId);

        // Fetch history
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/messages/${roomId}`);
                setMessages(res.data);
            } catch (err) { console.error(err); }
        };
        fetchHistory();

        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, [user, roomId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            conversationId: roomId,
            sender: user._id,
            text: newMessage,
            createdAt: new Date().toISOString() // for optimistic UI
        };

        await socket.emit('send_message', messageData);
        setMessages((list) => [...list, messageData]);
        setNewMessage('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!user) return <div>Please login to chat</div>;

    return (
        <div className="flex flex-col h-[600px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-xl max-w-4xl mx-auto my-8">
            <div className="bg-primary p-4 text-white font-bold flex justify-between">
                <span>Chat with Support</span>
                <span className="text-xs opacity-75">Room: {roomId?.substring(0, 6)}...</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                {messages.map((msg, index) => {
                    const isOwn = msg.sender === user._id;
                    return (
                        <div key={index} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-2xl ${isOwn
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-bl-none'
                                }`}>
                                <p>{msg.text}</p>
                                <span className={`text-[10px] block mt-1 ${isOwn ? 'text-primary-100' : 'text-slate-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex space-x-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default Chat;
