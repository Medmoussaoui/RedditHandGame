import CountdownTimer from "../CountDown";
import "../../styles.css";
import PlayerOption from "../PlayerOption";
import SelectYourCard from "./SelectYourCard";
import { useState } from "react";
import { GameCardOptions } from "../../entitys/game.entitys";

function Playing() {
  const [selectedCard, setSelectedCard] = useState<
    GameCardOptions | undefined
  >();

  const handleOnSelect = (card: GameCardOptions) => {
    console.log("-----> Your Select " + card);
    setSelectedCard(card);
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
