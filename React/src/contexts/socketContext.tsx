import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { useSocketConnection } from "../customHocks/useSocketConnection";

const SocketContext = createContext<Socket | null>(null);

export function useSocketContext() {
  return useContext(SocketContext);
}

function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useSocketConnection();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;
