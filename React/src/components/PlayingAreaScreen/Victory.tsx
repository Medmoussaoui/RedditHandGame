import ReactConfetti from "react-confetti";
import TitleAndDescription from "../TitleAndDescription";
import { useWindowSize } from "react-use";

const Victory = () => {
  const { width, height } = useWindowSize();
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <ReactConfetti width={width} height={height} />
        <span
          style={{
            fontSize: "50px",
          }}
        >
          🏆
        </span>
        <TitleAndDescription
          title="Victory Achieved"
          desc="You nailed it, congratulations on winning"
        />
      </div>
      <br />
    </div>
  );
};

export default Victory;
