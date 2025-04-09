import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import ClickableText from "../components/ClicableText";
import JoinRoomForm from "../components/JoinRoomForm";
import TitleAndDescription from "../components/TitleAndDescription";
import { useSocketContext } from "../contexts/socketContext";
import { useNavigate } from "react-router-dom";
import { JoinRoomData } from "../entitys/events.data.entitys";
import GuestBeginSoonScreen from "./GuestBeginSoonScreen";

const JoinRoomScreen = () => {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const [room, setRoom] = useState<JoinRoomData | undefined>();

  useEffect(() => {
    console.log("----> Lisen on roomJoined event");

    socket?.on("roomJoined", (data: JoinRoomData) => {
      console.log("-----------> Your are join room success: " + data.roomId);
      console.log("-----------> Your are join room: " + data.totalPlayers);
      setRoom(data);
      // redirect to Begin Son
    });

    return () => {
      console.log("----> Remove Lisen on roomJoined event");
      socket?.off("roomJoined");
    };
  }, [socket]);

  if (room) {
    return <GuestBeginSoonScreen room={room} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Ensure full viewport height
      }}
    >
      <AppBar autoBack={true} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <TitleAndDescription
          desc="compete with others in real-time"
          title="Join Room"
        />
        <JoinRoomForm />
        <ClickableText
          text="Navigate #Public Rooms"
          onClick={() => {
            navigate("/publicRooms");
          }}
        />
        <br />
      </div>
    </div>
  );
};

export default JoinRoomScreen;
