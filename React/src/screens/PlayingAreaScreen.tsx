import { useEffect, useState } from "react";
import PlayingAreaAppBar from "../components/PlayingAreaAppBar";
import Playing from "../components/PlayingAreaScreen/Playing";
import RoundResult from "../components/PlayingAreaScreen/RoundResult";
import ProgressBarTimer from "../components/ProgressBarTimer";
import { useSocketContext } from "../contexts/socketContext";
import { PlayingData, RoundResultData } from "../entitys/events.data.entitys";

type GameStates = "playing" | "roundResult" | "victory";

function usePlayingAreaManager() {
  const socket = useSocketContext();
  const [gameState, setGameState] = useState<GameStates>("playing");
  const [roundResult, setRoundResult] = useState<RoundResultData>();
  const [playingData, setPlayingData] = useState<PlayingData>({
    roundNumber: 1,
    roundEndTime: new Date(),
    playersCount: 8,
  });

  useEffect(() => {
    socket?.on("roundResult", (data: RoundResultData) => {
      setRoundResult(data);
      setGameState("roundResult");
    });

    socket?.on("playing", (data) => {
      setRoundResult(undefined);
      setGameState("playing");
      setPlayingData(data);
    });

    return () => {
      socket?.off("roundResult");
      socket?.off("playing");
    };
  }, [socket]);

  return { gameState, roundResult, playingData };
}

const PlayingAreaScreen = () => {
  const { gameState, roundResult, playingData } = usePlayingAreaManager();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Ensure full viewport height
      }}
    >
      <PlayingAreaAppBar {...playingData} />
      {gameState == "playing" && (
        <ProgressBarTimer
          ms={12000}
          onComplete={() => {
            console.log("-----> Complete Timer");
          }}
        />
      )}
      {gameState == "playing" && <Playing />}
      {gameState == "roundResult" && roundResult && (
        <RoundResult {...roundResult!} />
      )}
    </div>
  );
};

export default PlayingAreaScreen;
