import { createContext, useContext } from 'react';

export const WsContext = createContext(null);

export const useWs = () => useContext(WsContext);
