export interface RoomEntity {
  roomId: string;
  roomName: string;
  totalPlayers: number;
  joinedPlayers?: number;
}

export interface PublicRoomEntity {
  roomId: string;
  name: string;
  maxPlayers: number;
  visibility: RoomVisibility;
  owner: string;
  joinedPlayers: number;
  createdAt: Date;
}

export type RoomVisibility = "Public" | "Private";
