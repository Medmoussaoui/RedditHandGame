import AppBar from "../components/AppBar";
import TitleAndDescription from "../components/TitleAndDescription";
import StepsDot from "../components/StepDots";
import "../styles.css";
import BackStep from "../components/CreateRoom/BackStep";
import EnterRoomName from "../components/CreateRoom/Steps/EnterRoomName";
import ComponentsView from "../components/ComponentsView";
import SetPlayersRoom from "../components/CreateRoom/Steps/SetPlayersRoom";
import SetRoomVisibility from "../components/CreateRoom/Steps/SetRoomVisibility";
import { useCreateRoomContext } from "../contexts/createRoomContext";
import { useEffect, useState } from "react";
import { useSocketContext } from "../contexts/socketContext";
import { CreatedRoomData } from "../entitys/events.data.entitys";
import HostBeginSoonScreen from "./HostBeginSoonScreen";
import { RoomEntity } from "../entitys/room.entity";

const CreateRoomScreen = () => {
  const { state, dispatch } = useCreateRoomContext();
  const socket = useSocketContext();
  const [room, setRooms] = useState<CreatedRoomData | undefined>(undefined);

  useEffect(() => {
    console.log("----> Lisen on roomCreated event");
    socket?.on("roomCreated", (data: CreatedRoomData) => {
      console.log("----> Room Created: " + JSON.stringify(data));
      setRooms(data);
      /// TODO: redirect to Host Begin Soon
    });

    return () => {
      console.log("----> close Lisen on roomCreated event");
      socket?.off("roomCreated");
    };
  }, [socket]);

  if (room) {
    const roomEntity: RoomEntity = {
      roomId: room.id,
      roomName: room.name,
      totalPlayers: room.maxPlayers,
      joinedPlayers: 1,
    };
    return <HostBeginSoonScreen {...roomEntity} />;
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          gap: "15px",
        }}
      >
        {/* Contect */}
        <TitleAndDescription
          title="Create Room"
          desc="Share the link, invite friends, and get ready to play"
        />

        <StepsDot steps={3} position={state.step} />

        <ComponentsView
          position={state.step}
          items={[<EnterRoomName />, <SetPlayersRoom />, <SetRoomVisibility />]}
        />
        {state.step > 0 && (
          <BackStep
            onClick={() => {
              dispatch({ type: "BACK_STEP" });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CreateRoomScreen;
