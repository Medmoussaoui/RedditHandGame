import { GameCardOptions, OptionState } from "../entitys/game.entitys";
import "../styles.css";

interface PlayerOptionProps {
  option?: GameCardOptions;
  state?: OptionState;
  hint?: string;
  opacity?: number;
}

// marginTop: state != "none" ? "16px" : "0px",
const PlayerOption = ({
  option,
  state = "none",
  hint,
  opacity,
}: PlayerOptionProps) => {
  const playerOption = option || "unVisible";
  return (
    <div
      className="game-card"
      style={{
        backgroundColor: getBackgroundColor(state),
      }}
    >
      <img
        key={playerOption}
        className="player-option-img-fade-in"
        style={{
          display: "block",
          height: "85px",
          maxWidth: option ? (option === "paper" ? "42%" : "52%") : "30%",
          margin: "0 auto",
          objectFit: "contain",
          opacity: opacity || (state === "none" ? 0.8 : 0.9),
        }}
        src={"assets/" + playerOption + ".png"}
        alt={option}
      />
      {hint && (
        <span
          style={{
            fontSize: "13px",
            color: "#ffffff",
            opacity: 0.4,
            fontWeight: "100",
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
};

function getBackgroundColor(state: OptionState): string {
  switch (state) {
    case "win":
      return "#27AE60";
    case "loss":
      return "#E74C3C";
    default:
      return "#B0B8D105";
  }
}

export default PlayerOption;
