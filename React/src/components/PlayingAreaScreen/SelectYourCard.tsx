import MagicText from "../MagicText";
import "../../styles.css";
import GameCardOptionImg from "./GameCardOptionImg";
import { GameCardOptions } from "../../entitys/game.entitys";

interface SelectYourCardProps {
  selectedCard?: GameCardOptions;
  onSelect: (card: GameCardOptions) => void;
}

const SelectYourCard = ({ selectedCard, onSelect }: SelectYourCardProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <MagicText text="Select Your Card" />
      <div
        style={{
          gap: "16px",
          display: "flex",
        }}
      >
        <GameCardOptionImg
          isSelected={selectedCard === "rock"}
          imgPath="assets/rockCard.png"
          onClick={() => onSelect("rock")}
        />
        <GameCardOptionImg
          isSelected={selectedCard === "paper"}
          imgPath="assets/paperCard.png"
          onClick={() => onSelect("paper")}
        />
        <GameCardOptionImg
          isSelected={selectedCard === "scissors"}
          imgPath="assets/scissorsCard.png"
          onClick={() => onSelect("scissors")}
        />
      </div>
    </div>
  );
};

export default SelectYourCard;
