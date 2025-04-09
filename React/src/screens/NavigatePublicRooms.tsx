import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import RoomsList from "../components/PublicRooms";
import TitleAndDescription from "../components/TitleAndDescription";
import "../styles.css";
import { JoinRoomData } from "../entitys/events.data.entitys";
import GuestBeginSoonScreen from "./GuestBeginSoonScreen";
import { useSocketContext } from "../contexts/socketContext";

function NavigatePublicRooms() {
  const socket = useSocketContext();
  const [room, setRoom] = useState<JoinRoomData>();

  useEffect(() => {
    socket?.on("roomJoined", (data: JoinRoomData) => {
      setRoom(data);
    });
    return () => {
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
        height: "100%",
        width: "100vw",
      }}
    >
      <AppBar autoBack={true} />
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        {/* Background Image */}
        <div
          className="background-img-style"
          style={{
            backgroundImage: `url('assets/map.png')`,
          }}
        ></div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
            gap: "20px",
          }}
        >
          <TitleAndDescription
            title="Public Rooms"
            desc="You can join any room and play with the world"
          />
          <RoomsList />
        </div>
      </div>
    </div>
  );
}

export default NavigatePublicRooms;
