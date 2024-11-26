import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const url = import.meta.env.VITE_URL_WSS;
    if (!url) return;

    const newSocket = io(url, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    setSocket(newSocket);

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleError = err => {
      console.error('Socket error:', err);
    };
    const handleTimeout = () => {
      console.warn('Socket connection timeout.');
    };

    newSocket.on('connect', handleConnect);
    newSocket.on('disconnect', handleDisconnect);
    newSocket.on('connect_error', handleError);
    newSocket.on('connect_timeout', handleTimeout);

    return () => {
      newSocket.disconnect();
      newSocket.off('connect', handleConnect);
      newSocket.off('disconnect', handleDisconnect);
      newSocket.off('connect_error', handleError);
      newSocket.off('connect_timeout', handleTimeout);
    };
  }, []);

  return { socket, isConnected };
};

export { useSocket };
