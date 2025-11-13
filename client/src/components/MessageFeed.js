import React, { useState, useRef, useEffect } from 'react';

const MessageFeed = ({ messages, currentUser, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="message-feed">
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`message ${
                message.user === currentUser ? 'own-message' : 'other-message'
              }`}
            >
              <div className="message-header">
                <span className="message-user">{message.user}</span>
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className="message-content">{message.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="input-group">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
            maxLength={500}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={!newMessage.trim()}
          >
            <span className="send-icon">➤</span>
          </button>
        </div>
      </form>

      <style jsx>{`
        .message-feed {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: rgba(255, 255, 255, 0.98);
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .message {
          max-width: 70%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          animation: fadeIn 0.3s ease-in;
        }

        .own-message {
          align-self: flex-end;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .other-message {
          align-self: flex-start;
          background: #f1f3f4;
          color: #333;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .message-user {
          font-weight: 600;
        }

        .message-time {
          font-size: 0.7rem;
        }

        .message-content {
          word-wrap: break-word;
          line-height: 1.4;
        }

        .message-input-form {
          padding: 1rem;
          background: white;
          border-top: 1px solid #e1e8ed;
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .message-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #e1e8ed;
          border-radius: 2rem;
          outline: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .message-input:focus {
          border-color: #667eea;
        }

        .send-button {
          padding: 0.75rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-icon {
          font-size: 0.8rem;
          transform: rotate(90deg);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .message {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  );
};

export default MessageFeed;