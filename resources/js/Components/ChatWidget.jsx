import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Try the standard chat completions endpoint instead of RAG
            const response = await axios.post('https://api.vultrinference.com/v1/chat/completions', {
                model: "llama2-7b-chat-Q5_K_M",
                messages: [{
                    role: "system",
                    content: "You are a helpful assistant. Provide clear and concise responses."
                }, {
                    role: "user",
                    content: input
                }],
                max_tokens: 256,
                temperature: 0.7,
                top_p: 0.9,
                stream: false
            }, {
                headers: {
                    'Authorization': `Bearer RWY5HMOMGRM6NKOUODQ3ZAEINWD7GYPSJVYQ`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            });

            if (response.data?.choices?.[0]?.message?.content) {
                const botMessage = { 
                    text: response.data.choices[0].message.content, 
                    sender: 'bot' 
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Chat error:', error);
            
            // Enhanced error handling with response data logging
            if (error.response) {
                console.error('Error details:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
            }

            let errorMessage = { sender: 'bot' };
            
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        errorMessage.text = 'Authentication failed. Please verify your API key.';
                        break;
                    case 404:
                        errorMessage.text = 'API endpoint not found. Please check the service configuration.';
                        break;
                    case 429:
                        errorMessage.text = 'Too many requests. Please try again later.';
                        break;
                    case 500:
                        errorMessage.text = 'Server error. Please try again later or contact support.';
                        break;
                    default:
                        errorMessage.text = `Error: ${error.response.data?.error || 'Unknown error occurred'}`;
                }
            } else if (error.code === 'ECONNABORTED') {
                errorMessage.text = 'Request timed out. Please try again.';
            } else if (!navigator.onLine) {
                errorMessage.text = 'No internet connection. Please check your connection and try again.';
            } else {
                errorMessage.text = 'An unexpected error occurred. Please try again.';
            }
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            ) : (
                <div className="bg-white rounded-lg shadow-xl w-80 max-h-[500px] flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="font-semibold">Virtual Assistant</h3>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-gray-500 text-center">
                                Send a message to start the conversation!
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <div 
                                key={index}
                                className={`${
                                    message.sender === 'user' 
                                        ? 'ml-auto bg-indigo-600 text-white' 
                                        : 'mr-auto bg-gray-200 text-gray-900'
                                } rounded-lg p-3 max-w-[80%] whitespace-pre-wrap`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-center">
                                <div className="animate-bounce text-gray-500">
                                    ⋯
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="border-t p-4">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-indigo-500"
                                disabled={loading}
                            />
                            <button 
                                type="submit"
                                className={`px-4 py-2 rounded-lg ${
                                    loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                } text-white`}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}