import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState(['Welcome to Cloud Messaging Dashboard!']);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [currentUser] = useState('User' + Math.floor(Math.random() * 1000));
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = new WebSocket('ws://localhost:3001');
    
    newSocket.onopen = () => {
      console.log('Connected to server');
      // Send join message
      newSocket.send(JSON.stringify({
        type: 'join',
        username: currentUser
      }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'newMessage') {
        setMessages(prev => [...prev, `${data.user}: ${data.text}`]);
      } else if (data.type === 'usersUpdate') {
        setUsers(data.users);
      }
    };

    newSocket.onclose = () => {
      console.log('Disconnected from server');
    };

    setSocket(newSocket);

    // Cleanup
    return () => {
      newSocket.close();
    };
  }, [currentUser]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      // Send message via WebSocket
      socket.send(JSON.stringify({
        type: 'sendMessage',
        text: input,
        user: currentUser
      }));
      
      // Also show locally immediately
      setMessages(prev => [...prev, `You: ${input}`]);
      setInput('');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Sidebar */}
      <div style={{ 
        width: '250px', 
        background: '#2c3e50', 
        color: 'white',
        padding: '20px'
      }}>
        <h3>👥 Online Users</h3>
        <p>Total: {users.length} users</p>
        <div style={{ marginTop: '10px' }}>
          {users.map(user => (
            <div key={user.id} style={{ 
              padding: '5px', 
              background: user.username === currentUser ? '#3498db' : 'rgba(255,255,255,0.1)',
              margin: '2px 0',
              borderRadius: '3px'
            }}>
              {user.username}
              {user.username === currentUser && ' (You)'}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>📊 Analytics</h3>
          <p>Total Messages: {messages.length}</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        background: '#ecf0f1'
      }}>
        {/* Header */}
        <div style={{ 
          background: '#34495e', 
          color: 'white', 
          padding: '15px 20px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          💬 Cloud Messaging Dashboard
        </div>

        {/* Messages */}
        <div style={{ 
          flex: 1, 
          padding: '20px',
          overflowY: 'auto'
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ 
              marginBottom: '10px',
              padding: '10px',
              background: msg.startsWith('You:') ? '#3498db' : 'white',
              color: msg.startsWith('You:') ? 'white' : 'black',
              borderRadius: '10px',
              maxWidth: '80%'
            }}>
              {msg}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div style={{ 
          padding: '20px', 
          background: '#bdc3c7',
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            style={{
              padding: '12px 24px',
              background: input.trim() ? '#27ae60' : '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              fontSize: '16px'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;