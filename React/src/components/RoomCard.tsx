import { PublicRoomEntity, RoomEntity } from "../entitys/room.entity";
import SecondryButton from "./SecndryButton";

interface RoomCardProps {
  index: number;
  room: PublicRoomEntity;
  onClickJoinRoom: (roomId: string) => void;
}

const RoomCard = (props: RoomCardProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#B0B8D105",
        borderRadius: "13px",
        padding: "10px",
        width: "330px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CircleCount count={props.index} />
        <RoomNameAndPlayers room={props.room} />
      </div>
      <SecondryButton
        text="Join"
        width="60px"
        height="40px"
        onClick={() => props.onClickJoinRoom(props.room.roomId)}
      />
    </div>
  );
};

function RoomNameAndPlayers({ room }: { room: PublicRoomEntity }) {
  return (
    <div>
      <div
        style={{
          fontWeight: "500",
          fontSize: "16px",
          color: "#ffffff",
          opacity: "0.9",
        }}
      >
        {"#"}
        {room.name}
      </div>
      <div style={{ fontWeight: "100", fontSize: "12px", color: "#B0B8D1" }}>
        {room.joinedPlayers} Players Joined
      </div>
    </div>
  );
}

function CircleCount({ count }: { count: number }) {
  return (
    <div
      style={{
        backgroundColor: "#B0B8D110", // Purple circle background
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "500",
        fontSize: "18px",
      }}
    >
      {count}
    </div>
  );
}

export default RoomCard;
