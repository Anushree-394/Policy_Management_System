import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiX, FiMessageSquare } from 'react-icons/fi';
import './styles.css';

const ExpertChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your insurance expert. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you with that. Could you provide more details?",
        "That's a great question! Let me find the best policy options for you.",
        "Based on your needs, I'd recommend considering our comprehensive coverage plan.",
        "I understand your concern. Let me check the available options for you.",
        "For that, I'd suggest looking at our premium plans which offer better coverage."
      ];
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="expert-chat-container">
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Insurance Expert</h3>
            <button onClick={toggleChat} className="close-button">
              <FiX />
            </button>
          </div>
          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {formatTime(new Date(message.timestamp))}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="message-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              autoFocus
            />
            <button type="submit">
              <FiSend />
            </button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle-button" onClick={toggleChat}>
          <FiMessageSquare className="chat-icon" />
          <span>Talk to Expert</span>
        </button>
      )}
    </div>
  );
};

export default ExpertChat;
