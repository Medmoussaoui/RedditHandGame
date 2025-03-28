export interface RoomEntity {
  roomId: string;
  roomName: string;
  totalPlayers: number;
  joinedPlayers?: number;
}

export type RoomVisibility = "Public" | "Private";
