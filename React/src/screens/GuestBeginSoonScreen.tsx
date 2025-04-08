import { useEffect, useState } from "react";
import MagicText from "../components/MagicText";
import TertiaryButton from "../components/TertiaryButton";
import TitleAndDescription from "../components/TitleAndDescription";
import { RoomEntity } from "../entitys/room.entity";
import "../styles.css";
import { useSocketContext } from "../contexts/socketContext";
import {
  JoinsData,
  LeavedRoomData,
  LeaveRoomData,
  PlayerLeftData,
  PlayingData,
} from "../entitys/events.data.entitys";
import { useNavigate } from "react-router-dom";

const GuestBeginSoonScreen = ({ room }: { room: RoomEntity }) => {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const [roomData, setRoomData] = useState<RoomEntity>(room);

  const { totalPlayers, joinedPlayers, roomName } = roomData;

  useEffect(() => {
    socket?.on("playerJoined", (data: JoinsData) => {
      console.log("----> Player Joined: " + data.joinedPlayers);
      setRoomData((prev) => ({ ...prev, joinedPlayers: data.joinedPlayers }));
    });

    socket?.on("roomLeft", (data: LeavedRoomData) => {
      navigate("/");
    });

    socket?.on("playerLeft", (data: PlayerLeftData) => {
      setRoomData((prev) => ({ ...prev, joinedPlayers: data.remainsePlayers }));
    });

    socket?.on("gameStarted", (data: PlayingData) => {
      navigate("/playing", {
        replace: true,
        state: { data },
      });
    });
  }, [room]);

  const leaveRoomHandler = () => {
    const payload: LeaveRoomData = { roomId: room.roomId };
    socket?.emit("leaveRoom", payload);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <img
          style={{
            marginBottom: "20px",
          }}
          src="assets/game.png"
          alt="Room isReady"
          width="50px"
        />
        <TitleAndDescription
          title="Begins Soon"
          desc={`${joinedPlayers}/${totalPlayers} Players in, The Game Kicks Off Shortly`}
        />
        <TertiaryButton title="Leave Challenge" onClick={leaveRoomHandler} />
      </div>
      <br />
      <MagicText text={"#" + roomName} />
    </div>
  );
};

export default GuestBeginSoonScreen;
