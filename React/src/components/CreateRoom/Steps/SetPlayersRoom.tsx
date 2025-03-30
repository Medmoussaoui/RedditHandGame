import { useState } from "react";
import MiniInputForm from "../../MiniForm";
import StepForm from "../SteepForm";
import { useCreateRoomContext } from "../../../contexts/createRoomContext";

const SetPlayersRoom = () => {
  const { state, dispatch } = useCreateRoomContext();

  const handleIncrement = () => {
    dispatch({
      type: "SET_MAX_PLAYERS",
      payload: state.roomInfo.maxPlayers + 1,
    });
  };

  const handleDecrement = () => {
    if (state.roomInfo.maxPlayers === 0) return;
    dispatch({
      type: "SET_MAX_PLAYERS",
      payload: state.roomInfo.maxPlayers - 1,
    });
  };

  return (
    <StepForm
      onContinue={() => {
        if (state.roomInfo.maxPlayers >= 5) dispatch({ type: "CONTINUE" });
      }}
      step={2}
      desc="Set player count"
    >
      <div
        style={{
          width: "100%",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          flexDirection: "row",
        }}
      >
        <div onClick={handleDecrement} className="increment-decrement-box">
          -
        </div>
        <MiniInputForm
          type="number"
          hint="0"
          width="100%"
          center={true}
          value={state.roomInfo.maxPlayers.toString()}
          onChange={(input) => {
            if (input.length === 0) {
              return dispatch({ type: "SET_MAX_PLAYERS", payload: 0 });
            }
            if (Number.parseInt(input) > 12) return;
            dispatch({
              type: "SET_MAX_PLAYERS",
              payload: Number.parseInt(input),
            });
          }}
        />

        <div onClick={handleIncrement} className="increment-decrement-box">
          +
        </div>
      </div>
    </StepForm>
  );
};

export default SetPlayersRoom;
