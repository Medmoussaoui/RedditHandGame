import { useRef } from "react";
import { useSocketContext } from "../contexts/socketContext";
import "../styles.css";
import SecondryButton from "./SecndryButton";

const JoinRoomForm = () => {
  const socket = useSocketContext();
  const input = useRef(null);

  const handleJoinRoom = () => {
    if (input.current == null) return;
    const roomId = (input.current as HTMLInputElement).value;
    socket?.emit("joinRoom", { roomId });
    console.log("-----> Emit Join Room: " + roomId);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "45px",
        maxWidth: "600px",
        backgroundColor: "transparent",
        border: "1.5px solid #B0B8D120",
        borderRadius: "13px",
        padding: "8px",
      }}
    >
      {/* Input Field */}
      <input
        ref={input}
        type="text"
        className="customInput"
        placeholder="Enter room token"
        style={{
          flex: 1,
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          padding: "10px",
        }}
      />

      {/* Join Button */}
      <SecondryButton onClick={handleJoinRoom} text="Join" />
    </div>
  );
};

export default JoinRoomForm;
