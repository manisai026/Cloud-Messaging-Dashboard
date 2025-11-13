const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Store messages and users
const messages = [];
const users = new Map();

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send existing messages to new client
  ws.send(JSON.stringify({
    type: 'messageHistory',
    messages: messages
  }));

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'join') {
        // User joined
        const user = {
          id: Date.now() + Math.random(),
          username: message.username,
          joinedAt: new Date()
        };
        users.set(ws, user);
        
        // Notify all clients
        broadcast({
          type: 'usersUpdate',
          users: Array.from(users.values())
        });
        
        console.log(`User ${message.username} joined`);
      }
      else if (message.type === 'sendMessage') {
        // New message
        const user = users.get(ws);
        if (user && message.text.trim()) {
          const newMessage = {
            id: Date.now(),
            text: message.text,
            user: user.username,
            timestamp: new Date().toISOString()
          };
          
          messages.push(newMessage);
          
          // Broadcast to all clients
          broadcast({
            type: 'newMessage',
            ...newMessage
          });
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    const user = users.get(ws);
    if (user) {
      users.delete(ws);
      broadcast({
        type: 'usersUpdate',
        users: Array.from(users.values())
      });
      console.log(`User ${user.username} disconnected`);
    }
  });
});

// Broadcast to all connected clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// REST endpoints (optional)
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(Array.from(users.values()));
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    users: users.size,
    messages: messages.length
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
});