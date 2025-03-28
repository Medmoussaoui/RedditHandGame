import TitleAndDescription from "../components/TitleAndDescription";
import RoomLink from "../components/RoomLink";
import MagicText from "../components/MagicText";
import { RoomEntity } from "../entitys/room.entity";
import { useEffect, useState } from "react";
import { useSocketContext } from "../contexts/socketContext";
import { JoinsData } from "../entitys/events.data.entitys";
import { useNavigate } from "react-router-dom";

const HostBeginSoonScreen = (roomEntity: RoomEntity) => {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const [room, setRoom] = useState<RoomEntity>(roomEntity);

  useEffect(() => {
    socket?.on("playerJoined", (data: JoinsData) => {
      console.log("----> Player Joined: " + data.joinedPlayers);
      setRoom((prev) => ({ ...prev, joinedPlayers: data.joinedPlayers }));
    });

    socket?.on("gameStart", (data) => {
      navigate("/playing", { replace: true });
    });

    return () => {
      socket?.off("playerJoined");
      socket?.off("gameStart");
    };
  }, [socket]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <img
        style={{
          marginBottom: "20px",
        }}
        src="/assets/game.png"
        alt="Room isReady"
        width="50px"
      />
      <TitleAndDescription
        title="Room is Ready"
        desc="Share the link and invite friends to join the game!"
      />
      <RoomLink playersCount={room.joinedPlayers ?? 1} roomId={room.roomId} />
      <br />
      <br />
      <MagicText text="Begins Soon" />
    </div>
  );
};

export default HostBeginSoonScreen;
