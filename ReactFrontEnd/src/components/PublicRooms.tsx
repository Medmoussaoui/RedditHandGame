import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RoomEntity } from "../entitys/room.entity";
import MagicText from "./MagicText";
import RoomCard from "./RoomCard";
import { useSocketContext } from "../contexts/socketContext";

const fakeRoom: RoomEntity = {
  roomId: "fake-room",
  roomName: "ToopMed",
  totalPlayers: 10,
};

function RoomsList() {
  const socket = useSocketContext();
  const [rooms, setRooms] = useState<RoomEntity[]>(Array(10).fill(fakeRoom));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreRooms = () => {
    if (rooms.length >= 50) {
      setHasMore(false);
      return;
    }

    // Simulate fetching more rooms
    setTimeout(() => {
      setRooms((prevRooms) => [...prevRooms, ...Array(3).fill(fakeRoom)]);
    }, 1500);
  };

  const handleJoinRoom = (roomId) => {
    socket?.emit("joinRoom", { roomId });
    console.log("-----> Emit Join Room: " + roomId);
  };

  return (
    <div
      style={{
        border: "1px solid #B0B8D120",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        justifyItems: "center",
        alignItems: "center",
        padding: "20px",
        width: "350px",
        height: "300px",
        gap: "20px",
      }}
    >
      <MagicText text={"Join one of " + rooms.length + " rooms"} />
      <InfiniteScroll
        dataLength={rooms.length}
        next={fetchMoreRooms}
        hasMore={hasMore}
        loader={
          <h4 style={{ textAlign: "center", color: "#B0B8D120" }}>
            Loading...
          </h4>
        }
        height={250} // Adjust this to match your container height
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
          width: "100%",
          overflowX: "hidden",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer 10+
        }}
        endMessage={
          <p style={{ textAlign: "center", color: "#B0B8D120" }}>
            No more rooms to load
          </p>
        }
      >
        {rooms.map((room, index) => (
          <RoomCard
            key={index}
            index={index + 1}
            room={room}
            onClickJoinRoom={handleJoinRoom}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default RoomsList;
