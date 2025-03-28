import { useEffect, useState } from "react";
import { useSocketContext } from "../contexts/socketContext";

const Mesenger = () => {
  const socket = useSocketContext();
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState<string | null>(null);

  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket?.on("welcome", (data) => {
      console.log("-----------> Your are join room success");
      setRoom(data.roomId);
    });

    return () => {
      socket?.off("receiveMessage");
      socket?.off("welcome");
    };
  }, [socket]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "15px",
          border: "1px solid black",
        }}
      >
        {messages.map((message, index) => (
          <h3 key={index}>{message}</h3>
        ))}
      </div>
      <hr />
      {!room ? <JoinRoom /> : null}
      <hr />
      <MessageForm roomId={room || undefined} />
    </div>
  );
};

const MessageForm = ({ roomId }: { roomId?: string }) => {
  const socket = useSocketContext();
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    socket?.emit("sendMessage", { message: message, roomId });
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <input
        value={message}
        type="text"
        placeholder="Enter your message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

const JoinRoom = () => {
  const socket = useSocketContext();
  const [roomName, setRoomName] = useState<string>("");

  const handleJoinRoom = () => {
    socket?.emit("joinRoom", { roomId: roomName });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <input
        value={roomName}
        type="text"
        placeholder="Enter Room name to join ..."
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button
        style={{
          backgroundColor: "green",
        }}
        onClick={handleJoinRoom}
      >
        {" "}
        Join{" "}
      </button>
    </div>
  );
};

export default Mesenger;
