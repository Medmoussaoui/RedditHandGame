import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PublicRoomEntity } from "../entitys/room.entity";
import MagicText from "./MagicText";
import RoomCard from "./RoomCard";
import { useSocketContext } from "../contexts/socketContext";
import { getPublicRoom } from "../api/getPublicRooms";
import RoomCardSkeleton from "./RoomCardSkeleton";

function useGetPublicRooms() {
  let page = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  const [rooms, setRooms] = useState<PublicRoomEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    page.current++;
    setLoading(true);
    // loading simulation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newRooms = await getPublicRoom(page.current);
    console.log("------> Rows : " + newRooms.length);
    if (newRooms.length === 0) {
      setHasMore(false);
    } else {
      setRooms((prevRooms) => [...prevRooms, ...newRooms]);
    }
    setLoading(false);
  }

  return { rooms, hasMore, fetchRooms, loading };
}

function RoomsList() {
  const socket = useSocketContext();
  const controller = useGetPublicRooms();

  const handleJoinRoom = (roomId) => {
    socket?.emit("joinRoom", { roomId });
    console.log("-----> Emit Join Room: " + roomId);
  };

  const noData = controller.rooms.length == 0;

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
      <MagicText
        text={
          noData == false
            ? `Join one of ${controller.rooms.length} rooms`
            : controller.loading
            ? "Loading..."
            : "No rooms found"
        }
      />
      {/* Display Skeleton if no data and loading run */}
      {noData && controller.loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))}
        </div>
      )}
      {/*  Empty Image  */}
      {noData && !controller.loading && (
        <div
          style={{
            height: "65%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="assets/empty.png" width={"100px"} />
        </div>
      )}
      {/*  Display Data if has data */}
      {noData == false && (
        <InfiniteScroll
          dataLength={controller.rooms.length}
          next={controller.fetchRooms}
          hasMore={controller.hasMore}
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
            controller.rooms.length > 0 ? (
              <p style={{ textAlign: "center", color: "#B0B8D120" }}>
                No more rooms to load
              </p>
            ) : null
          }
        >
          {controller.rooms.map((room, index) => (
            <RoomCard
              key={index}
              index={index + 1}
              room={room}
              onClickJoinRoom={handleJoinRoom}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default RoomsList;
