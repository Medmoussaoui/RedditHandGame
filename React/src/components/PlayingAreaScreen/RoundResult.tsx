import { RoundResultEntity } from "../../entitys/game.entitys";
import LightTitle from "../LightTitle";
import MagicText from "../MagicText";
import PlayerOption from "../PlayerOption";
import TimerCounter from "../TimerCounter";
import Victory from "./Victory";

function isDrawRound(RoundResult: RoundResultEntity) {
  const { options } = RoundResult;
  let isDraw = false;
  let matches = 0;
  for (let option of options) {
    if (option.quantity > 0) matches += 1;
  }
  return matches == 1 || matches == 3;
}

function RoundResult(result: RoundResultEntity) {
  const { options, yourOption, winingOption } = result;

  const isDraw = isDrawRound(result);

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
  console.log("----> Options = " + copyOptions.length);

  const myPosition = copyOptions.findIndex(
    (option) => option.option == yourOption
  );

  const myOption = copyOptions.splice(myPosition, 1)[0];

  const nonSelectedOptionIndex = copyOptions.findIndex(
    (option) => option.quantity === 0
  );

  const firstOption =
    nonSelectedOptionIndex == -1
      ? copyOptions.splice(0, 1)[0]
      : copyOptions.splice(nonSelectedOptionIndex, 1)[0];

  const newOptions = [firstOption, myOption, copyOptions[0]];

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
        {newOptions.map((option, index) => (
          <PlayerOption
            option={option.option}
            key={index}
            hint={`Picked by ${option.quantity}`}
            opacity={option.quantity === 0 ? 0.4 : undefined}
            state={
              isDraw
                ? "draw"
                : option.quantity === 0
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
