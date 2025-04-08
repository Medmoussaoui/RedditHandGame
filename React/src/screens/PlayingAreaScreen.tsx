import { useEffect } from "react";
import PlayingAreaAppBar from "../components/PlayingAreaAppBar";
import Playing from "../components/PlayingAreaScreen/Playing";
import ProgressBarTimer from "../components/ProgressBarTimer";
import { useSocketContext } from "../contexts/socketContext";
import { RoundResultData } from "../entitys/events.data.entitys";
import RoundResult from "../components/PlayingAreaScreen/RoundResult";
import { usePlayingAreaContext } from "../contexts/playingAreaContext";

type GameStates = "playing" | "roundResult" | "victory";

function usePlayingAreaManager() {
  const socket = useSocketContext();
  const context = usePlayingAreaContext();

  useEffect(() => {
    socket?.on("roundResult", (data: RoundResultData) => {
      context.dispatch({ type: "ROUND_RESULT", payload: data });
    });

    socket?.on("playing", (data) => {
      context.dispatch({ type: "PLAYING", payload: data });
    });

    return () => {
      socket?.off("roundResult");
      socket?.off("playing");
    };
  }, [socket]);

  return { state: context.state, dispatch: context.dispatch };
}

const PlayingAreaScreen = () => {
  const { state } = usePlayingAreaManager();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Ensure full viewport height
      }}
    >
      <PlayingAreaAppBar {...state.playingData!} />
      {state.gameState == "playing" && (
        <ProgressBarTimer
          ms={12000}
          onComplete={() => {
            console.log("-----> Complete Timer");
          }}
        />
      )}
      {state.gameState == "playing" && <Playing />}
      {state.gameState == "roundResult" && state.roundResult && (
        <RoundResult {...state.roundResult!} />
      )}
    </div>
  );
};

export default PlayingAreaScreen;
