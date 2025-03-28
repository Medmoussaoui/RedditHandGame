import { RoundResultData } from "../../entitys/events.data.entitys";
import LightTitle from "../LightTitle";
import MagicText from "../MagicText";
import PlayerOption from "../PlayerOption";
import TimerCounter from "../TimerCounter";
import Victory from "./Victory";

function RoundResult(result: RoundResultData) {
  const { options, yourOption, winingOption } = result;

  const isDraw = options.every((option) => option.quantity > 0);

  const isWin = isDraw
    ? false
    : options.some(
        (option) =>
          option.option === yourOption && option.option === winingOption
      );

  if (isWin && result.isLastRound) {
    return <Victory />;
  }

  const isLoss = !isDraw && !isWin;

  const copyOptions = options.slice();

  const myPosition = copyOptions.findIndex(
    (option) => option.option == yourOption
  );

  const myCategory = copyOptions.splice(myPosition, 1)[0];

  const index = copyOptions.findIndex((option) => option.quantity === 0);
  const zeroOption = copyOptions[index];

  const newOptions = [zeroOption, myCategory, copyOptions[0]];

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
      <ResultTitle draw={isDraw} isWin={isWin} />
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {newOptions.map((option) => (
          <PlayerOption
            option={option.option}
            key={option.option}
            hint={`Picked by ${option.quantity}`}
            opacity={option.quantity === 0 ? 0.4 : undefined}
            state={
              isDraw
                ? "draw"
                : option.option === zeroOption.option
                ? "none"
                : option.option == winingOption
                ? "win"
                : "loss"
            }
          />
        ))}
      </div>
      {(isWin || isDraw) && <NextRoundBeginSoon />}
      {isLoss && (
        <>
          <MagicText text="You'll get them next time" />
          <LightTitle> Your Rank 15 </LightTitle>
        </>
      )}
    </div>
  );
}

function NextRoundBeginSoon() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
      }}
    >
      <MagicText text="Next round begins soon" />
      <TimerCounter />
    </div>
  );
}

function YouWinTitle() {
  return (
    <LightTitle>
      You Win This Round!{" "}
      <img
        style={{ marginLeft: "10px" }}
        src="https://cdn-icons-png.flaticon.com/512/7626/7626666.png"
        alt="🎉"
        width="25px"
      />{" "}
    </LightTitle>
  );
}

function GameOverTitle() {
  return <LightTitle>Game Over 😢 You Gave It Your Best</LightTitle>;
}

function ResultTitle({ draw, isWin }) {
  const getResultComponent = () => {
    if (draw) return <LightTitle> It’s a Tie! Try Again 🤝 </LightTitle>;
    if (isWin) return <YouWinTitle />;
    return <GameOverTitle />;
  };

  const animationStyle: React.CSSProperties = {
    animation: "fadeIn 0.5s ease-out",
    transformOrigin: "center",
    textAlign: "center",
  };

  return <div style={animationStyle}>{getResultComponent()}</div>;
}

export default RoundResult;
