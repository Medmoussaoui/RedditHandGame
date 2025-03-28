import { PlayingData } from "../entitys/events.data.entitys";
import { formatTwoDigits } from "../functions/formatTowDigits";
import "../styles.css";

const PlayingAreaAppBar = (playingData: PlayingData) => {
  return (
    <div
      style={{
        height: "60px",
        padding: "15px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        borderBottom: "1px solid #B0B8D120",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Rounds round={playingData.roundNumber} />
        <RoomNameAndRemainingPlayers playersCount={playingData.playersCount} />
      </div>
      <ExitButton />
    </div>
  );
};

function ExitButton() {
  return (
    <img
      className="clicableText"
      onClick={() => {}}
      style={{
        cursor: "pointer",
      }}
      src="assets/exit.png"
      alt=""
      width="22px"
      height="22px"
    />
  );
}

function RoomNameAndRemainingPlayers({
  playersCount,
}: {
  playersCount: number;
}) {
  return (
    <div
      style={{
        gap: "4px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontWeight: "400",
          fontSize: "18px",
          color: "#ffffff",
          opacity: "0.9",
        }}
      >
        #ToopHalk
      </div>
      <div
        style={{
          fontWeight: "100",
          fontSize: "15px",
          color: "#B0B8D1",
          opacity: "0.9",
        }}
      >
        {playersCount} Players in the Arena
      </div>
    </div>
  );
}

function Rounds({ round }: { round: number }) {
  return (
    <div
      style={{
        padding: "5px 14px",
        backgroundColor: "#B0B8D110", // Purple circle background
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          color: "#ffffff",
          fontSize: "23px",
          fontWeight: "400",
          margin: "0px",
        }}
      >
        {formatTwoDigits(round)}
      </p>
      <p
        style={{
          color: "#B0B8D1",
          fontSize: "14px",
          fontWeight: "100",
          margin: "0px",
          opacity: "0.9",
        }}
      >
        round
      </p>
    </div>
  );
}

export default PlayingAreaAppBar;
