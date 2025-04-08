import { createContext, ReactNode, useContext, useReducer } from "react";
import { GameCardOptions, RoundResultEntity } from "../entitys/game.entitys";
import { PlayingData } from "../entitys/events.data.entitys";
import { useLocation } from "react-router-dom";

type GameStates = "playing" | "roundResult" | "victory";

// Initial state
const initialState: PlayingAreaState = {
  gameState: "playing",
  roundResult: undefined,
  playingData: undefined,
  selectedCard: undefined,
};

interface PlayingAreaState {
  gameState: GameStates;
  roundResult?: RoundResultEntity;
  playingData?: PlayingData;
  selectedCard?: GameCardOptions;
}

type PlayingAreaActions =
  | { type: "SELECT_CARD"; payload: GameCardOptions }
  | { type: "ROUND_RESULT"; payload: RoundResultEntity }
  | { type: "PLAYING"; payload: PlayingData };

const PlayingAreaContext = createContext<{
  state: PlayingAreaState;
  dispatch: React.Dispatch<PlayingAreaActions>;
} | null>(null);

export function usePlayingAreaContext() {
  const context = useContext(PlayingAreaContext);
  if (!context) {
    throw new Error(
      "usePlayingAreaContext must be used within a PlayingAreaProvider"
    );
  }
  return context;
}

function playingAreaReducer(
  state: PlayingAreaState,
  action: PlayingAreaActions
): PlayingAreaState {
  switch (action.type) {
    case "SELECT_CARD":
      return { ...state, selectedCard: action.payload };
    case "ROUND_RESULT":
      return {
        ...state,
        roundResult: {
          yourOption: state.selectedCard,
          ...action.payload,
        },
        gameState: "roundResult",
      };
    case "PLAYING":
      return {
        ...state,
        selectedCard: undefined,
        playingData: action.payload,
        roundResult: undefined,
        gameState: "playing",
      };
    default:
      return state;
  }
}

function PlayingAreaProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [state, dispatch] = useReducer(playingAreaReducer, {
    ...initialState,
    playingData: location.state.data,
  });

  return (
    <PlayingAreaContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayingAreaContext.Provider>
  );
}

export default PlayingAreaProvider;
