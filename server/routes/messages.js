const express = require('express');
const router = express.Router();

// In-memory storage (accessed from server.js)
let messages = [];

// Get all messages
router.get('/messages', (req, res) => {
  try {
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send a new message
router.post('/messages', (req, res) => {
  try {
    const { text, user } = req.body;
    
    if (!text || !user) {
      return res.status(400).json({ 
        error: 'Missing required fields: text and user' 
      });
    }

    if (text.length > 500) {
      return res.status(400).json({ 
        error: 'Message too long. Maximum 500 characters.' 
      });
    }

    const message = {
      id: Date.now() + Math.random(),
      text: text.trim(),
      user: user,
      timestamp: new Date().toISOString()
    };
    
    messages.push(message);
    
    // Keep only last 1000 messages to prevent memory issues
    if (messages.length > 1000) {
      messages = messages.slice(-500);
    }
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get message statistics
router.get('/messages/stats', (req, res) => {
  try {
    const totalMessages = messages.length;
    
    const messagesLastHour = messages.filter(msg => {
     