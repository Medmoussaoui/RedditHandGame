import { GameCardOptions, SelectedOption } from "./game.entitys";
import { RoomEntity, RoomVisibility } from "./room.entity";

export interface CreateRoomData {
  name: string;
  visibility: RoomVisibility;
  maxPlayers: number;
}

export interface CreatedRoomData extends CreateRoomData {
  roomId: string;
}

/// when client send joinRoom event server process/success and emit this
export interface JoinedRoomData {
  id: string;
  name: string;
  totalPlayers: number;
  joinedPlayers: number;
}

// when player jon to room the socket emit this pyaload
export interface JoinsData {
  roomId: string;
  joinedPlayers: number;
}

export interface JoinRoomData extends RoomEntity {}

export interface RoundResultData {
  winingOption?: GameCardOptions;
  options: SelectedOption[];
  isLastRound?: boolean;
}

export interface PlayingData {
  roundNumber: number;
  roundEndTime: Date;
  playersCount: number;
}

export interface PlayerLeftData {
  roomId: string;
  playerId: string;
  remainsePlayers: number;
}

export interface LeavedRoomData {
  roomId: string;
}

export interface LeaveRoomData {
  roomId: string;
}
