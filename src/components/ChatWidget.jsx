import { useState } from 'react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Здравствуйте! 👋 Я помогу вам получить бесплатную консультацию юриста.',
            isBot: true,
            timestamp: new Date()
        },
        {
            id: 2,
            text: 'Какой вопрос вас интересует?',
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const quickReplies = [
        '💰 Страховые выплаты',
        '🎖️ Льготы для военных',
        '📞 Заказать звонок',
        '📧 Написать на почту'
    ];

    const handleQuickReply = (reply) => {
        const userMessage = {
            id: messages.length + 1,
            text: reply,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);

        // Simulate bot typing
        setIsTyping(true);

        setTimeout(() => {
            let botResponse = '';

            switch (reply) {
                case '💰 Страховые выплаты':
                    botResponse = 'Мы поможем получить все положенные страховые выплаты. Средняя сумма выплат наших клиентов — 2.1 млн ₽.';
                    break;
                case '🎖️ Льготы для военных':
                    botResponse = 'Участникам СВО положены различные льготы: налоговые, жилищные, медицинские и др.';
                    break;
                case '📞 Заказать звонок':
                    botResponse = '';
                    break;
                case '📧 Написать на почту':
                    botResponse = 'Вы можете написать нам на почту: lipetskcentrprava@gmail.com или заполнить форму на сайте для быстрого ответа.';
                    break;
                default:
                    botResponse = 'Спасибо за ваш вопрос! Наш специалист свяжется с вами для подробной консультации.';
            }

            const botMessage = {
                id: messages.length + 1,
                text: botResponse,
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        }, 1500);

        setTimeout(() => {
            setIsTyping(false);

            const botMessage = {
                id: messages.length + 1,
                text: "Пожалуйста, оставьте заявку на бесплатную консультацию на нашем сайте, и наш юрист свяжется с вами в ближайшее время.",
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        }, 2000);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot response
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            
            const botMessage = {
                id: messages.length + 2,
                text: 'Спасибо за ваше сообщение! Наш юрист ответит вам в ближайшее время. Для срочной консультации звоните: +7 (474) 220-07-19',
                isBot: true,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Widget Button */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:left-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-3 sm:p-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 group"
                >
                    <div className="relative">
                        <svg
                            className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <svg
                            className={`h-5 w-5 sm:h-6 sm:w-6 absolute inset-0 transition-transform duration-300 ${isOpen ? 'rotate-0 scale-100' : 'rotate-180 scale-0'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    {/* Notification badge */}
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center animate-pulse">
                        2
                    </div>
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:left-6 sm:right-auto z-50 w-auto sm:w-96 max-w-sm mx-auto sm:mx-0">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[70vh] sm:max-h-none">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                        <span className="text-lg sm:text-xl">⚖️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm sm:text-base">Юридическая помощь</h3>
                                        <p className="text-xs opacity-90">Онлайн • Отвечаем быстро</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors p-1"
                                >
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-xs sm:max-w-md px-3 py-2 sm:px-4 sm:py-2 rounded-2xl ${
                                        message.isBot
                                            ? 'bg-gray-100 text-gray-800'
                                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    }`}>
                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 rounded-2xl px-3 py-2 sm:px-4 sm:py-2">
                                        <div className="flex space-x-1">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Replies */}
                        <div className="px-3 py-2 sm:px-4 sm:py-2 border-t border-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {quickReplies.map((reply, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickReply(reply)}
                                        className="text-xs sm:text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-2 sm:px-3 sm:py-2 rounded-lg transition-colors duration-200 text-left leading-tight"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-3 sm:p-4 border-t border-gray-100">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Напишите ваш вопрос..."
                                    className="flex-1 px-3 py-2 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-tight"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 sm:p-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex-shrink-0"
                                >
                                    <svg className="h-4 w-4 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
