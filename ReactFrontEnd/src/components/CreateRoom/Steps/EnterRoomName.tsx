import MiniInputForm from "../../MiniForm";
import StepForm from "../SteepForm";
import { useCreateRoomContext } from "../../../contexts/createRoomContext";

const EnterRoomName = () => {
  const { state, dispatch } = useCreateRoomContext();

  return (
    <StepForm
      onContinue={() => {
        if (state.roomInfo.name.length > 3) dispatch({ type: "CONTINUE" });
      }}
      step={1}
      desc="Enter the room name"
    >
      <MiniInputForm
        value={state.roomInfo.name}
        hint="#EnterRoomName"
        onChange={(input) => {
          if (input.length == 0) {
            dispatch({ type: "ENTER_ROOM_NAME", payload: "" });
          } else {
            const removeHash = input.replace("#", "");
            dispatch({
              type: "ENTER_ROOM_NAME",
              payload: "#" + removeHash,
            });
          }
        }}
      />
    </StepForm>
  );
};

export default EnterRoomName;
