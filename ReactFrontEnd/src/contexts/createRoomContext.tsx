import { createContext, useContext, useReducer, ReactNode } from "react";
import { CreateRoomData } from "../entitys/events.data.entitys";
import { RoomVisibility } from "../entitys/room.entity";

// Define the state interface
interface CreateRoomState {
  step: number;
  roomInfo: CreateRoomData;
}

// Define action types
type CreateRoomAction =
  | { type: "CONTINUE" }
  | { type: "BACK_STEP" }
  | { type: "ENTER_ROOM_NAME"; payload: string }
  | { type: "SET_MAX_PLAYERS"; payload: number }
  | { type: "SET_ROOM_VISIBILITY"; payload: RoomVisibility };

// Initial state
const initialState: CreateRoomState = {
  step: 0,
  roomInfo: {
    name: "",
    maxPlayers: 5,
    visibility: "Private",
  } as CreateRoomData, // Assuming CreateRoomData is an object
};

// Reducer function
const createRoomReducer = (
  state: CreateRoomState,
  action: CreateRoomAction
): CreateRoomState => {
  switch (action.type) {
    case "CONTINUE":
      if (state.step + 1 > 2) {
        // send emit event to create room
        return state;
      }
      return { ...state, step: state.step + 1 };
    case "BACK_STEP":
      if (state.step - 1 < 0) return state;
      return { ...state, step: state.step - 1 };
    case "ENTER_ROOM_NAME":
      return {
        ...state,
        roomInfo: { ...state.roomInfo, name: action.payload },
      };
    case "SET_MAX_PLAYERS":
      if (action.payload < 5) return state;
      if (action.payload > 12) return state;
      return {
        ...state,
        roomInfo: { ...state.roomInfo, maxPlayers: action.payload },
      };
    case "SET_ROOM_VISIBILITY":
      return {
        ...state,
        roomInfo: { ...state.roomInfo, visibility: action.payload },
      };

    default:
      return state;
  }
};

// Create context with default value as null
const CreateRoomContext = createContext<{
  state: CreateRoomState;
  dispatch: React.Dispatch<CreateRoomAction>;
} | null>(null);

// Custom hook to use the context
export const useCreateRoomContext = () => {
  const context = useContext(CreateRoomContext);
  if (!context) {
    throw new Error(
      "useCreateRoomContext must be used within a CreateRoomProvider"
    );
  }
  return context;
};

// Context Provider component
export function CreateRoomProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(createRoomReducer, initialState);

  return (
    <CreateRoomContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateRoomContext.Provider>
  );
}
