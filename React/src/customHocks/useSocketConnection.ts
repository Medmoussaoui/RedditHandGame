import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:5000/";

export function useSocketConnection() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("---------> try to connect ws");
    const SOCKET = io(SERVER_URL, {
      autoConnect: true,
      transports: ["websocket", "polling"],
    });
    SOCKET.on("connect", () => {
      console.log("----------> Connected ws");
    });

    SOCKET.on("disconnect", () => {
      console.log("----------> Disconnected ws");
    });

    setSocket(SOCKET);
    return () => {
      SOCKET.disconnect();
    };
  }, []);

  return socket;
}
