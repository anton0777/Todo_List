import { useEffect, useState } from 'react';
import { WsContext } from '../context/WsContext';
import { useAuth } from '../context/AuthContext';

export function WsProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const token = useAuth().user?.token;

  useEffect(() => {
    if (!token) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      return;
    }

    const WS_URL = 'ws://localhost:3000/ws';
    const ws = new WebSocket(WS_URL, ['token', token]);
    setSocket(ws);

    ws.onopen = () => console.log('[WS] connected');
    ws.onclose = () => console.log('[WS] closed');
    ws.onerror = (e) => console.error('[WS] error', e);
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        window.dispatchEvent(new CustomEvent('ws-message', { detail: msg }));
      } catch (err) {
        console.error('[WS] bad message', err);
      }
    };

    return () => ws.close();
  }, [token]);

  return <WsContext.Provider value={socket}>{children}</WsContext.Provider>;
}
