import CountdownTimer from "../CountDown";
import "../../styles.css";
import PlayerOption from "../PlayerOption";
import SelectYourCard from "./SelectYourCard";
import { GameCardOptions } from "../../entitys/game.entitys";
import { useSocketContext } from "../../contexts/socketContext";
import { usePlayingAreaContext } from "../../contexts/playingAreaContext";
import { useEffect } from "react";
import { randomGameGard } from "../../functions/radndomGameCard";

function Playing() {
  const socket = useSocketContext();
  const { state, dispatch } = usePlayingAreaContext();
  const selectedCard = state.selectedCard;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedCard === undefined) {
        handleOnSelect(randomGameGard());
      }
    }, 8000);

    // Clean up the timeout on unmount
    return () => clearTimeout(timer);
  }, [selectedCard]);

  const handleOnSelect = (card: GameCardOptions) => {
    console.log("-----> Your Select " + card);
    dispatch({ type: "SELECT_CARD", payload: card });
    socket?.emit("selectGameCard", { option: card });
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <CountdownTimer initialSeconds={12} />
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <PlayerOption state="none" />
        <PlayerOption option={selectedCard} />
        <PlayerOption state="none" />
      </div>
      <SelectYourCard selectedCard={selectedCard} onSelect={handleOnSelect} />
    </div>
  );
}

export default Playing;
