import axios from 'axios';
import io from 'socket.io-client';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// REST API service
export const apiService = {
  getMessages: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
};

// Single socket instance with connection management
let socketInstance = null;
let isConnecting = false;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(API_BASE_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket event handlers
    socketInstance.on('connect', () => {
      console.log('Connected to server');
      isConnecting = false;
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      isConnecting = false;
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error);
      isConnecting = false;
    });
  }
  return socketInstance;
};

// Export socket instance
export const socket = getSocket();