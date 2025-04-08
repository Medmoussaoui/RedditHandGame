import StepForm from "../SteepForm";
import { RoomVisibility } from "../../../entitys/room.entity";
import { useCreateRoomContext } from "../../../contexts/createRoomContext";
import { useSocketContext } from "../../../contexts/socketContext";

interface SelectedButtonProps {
  text: string;
  active: boolean;
  onClick: (state: boolean) => void;
}

const SetRoomVisibility = () => {
  const { state, dispatch } = useCreateRoomContext();
  const socket = useSocketContext();

  const handleSetVisibility = (visibility: RoomVisibility) => {
    dispatch({ type: "SET_ROOM_VISIBILITY", payload: visibility });
  };

  const handleLaunchRoom = () => {
    state.roomInfo.name = state.roomInfo.name.replace("#", "");
    socket?.emit("createRoom", state.roomInfo);
    console.log("----> Send Emit (createRoom) Event ");
    console.log("RoomInfo : " + JSON.stringify(state.roomInfo));
  };

  return (
    <StepForm
      onContinue={handleLaunchRoom}
      buttonTitle="Create & launch"
      step={3}
      desc="Set room visibility"
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <SelectedButton
          text="Public"
          active={state.roomInfo.visibility === "Public"}
          onClick={(state) => {
            handleSetVisibility("Public");
          }}
        />
        <SelectedButton
          text="Private"
          active={state.roomInfo.visibility === "Private"}
          onClick={(state) => {
            handleSetVisibility("Private");
          }}
        />
      </div>
    </StepForm>
  );
};

function SelectedButton(props: SelectedButtonProps) {
  const className = props.active ? "selected-button" : "unselected-button";

  return (
    <div
      onClick={() => props.onClick(props.active)}
      className={className}
      style={{
        width: "100%",
        padding: "13px",
        borderRadius: "9px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.text}
    </div>
  );
}

export default SetRoomVisibility;
