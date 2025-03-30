import MagicText from "../components/MagicText";
import TertiaryButton from "../components/TertiaryButton";
import TitleAndDescription from "../components/TitleAndDescription";
import { RoomEntity } from "../entitys/room.entity";
import "../styles.css";

const GuestBeginSoonScreen = ({ room }: { room: RoomEntity }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <img
          style={{
            marginBottom: "20px",
          }}
          src="assets/game.png"
          alt="Room isReady"
          width="50px"
        />
        <TitleAndDescription
          title="Begins Soon"
          desc={`${room.joinedPlayers}/${room.totalPlayers} Players in, The Game Kicks Off Shortly`}
        />
        <TertiaryButton
          title="Leave Challenge"
          onClick={() => {
            /// TODO: implement leaving room
          }}
        />
      </div>
      <br />
      <MagicText text={"#" + room.roomName} />
    </div>
  );
};

export default GuestBeginSoonScreen;
