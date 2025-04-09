import { SERVER_URL } from "../config/constant";
import { PublicRoomEntity } from "../entitys/room.entity";

export async function getPublicRoom(page: number): Promise<PublicRoomEntity[]> {
  const url = `${SERVER_URL}/rooms`;

  try {
    const responce = await fetch(url, {
      method: "GET",
      headers: {
        page: page.toString(),
        "Content-Type": "application/json",
      },
    });

    return (await responce.json()) as PublicRoomEntity[];
  } catch (err) {
    return [];
  }
}
