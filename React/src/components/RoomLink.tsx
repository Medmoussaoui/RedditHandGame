import { useEffect, useState } from "react";
import SecondryButton from "./SecndryButton";

interface RoomLinkProps {
  roomId: string;
  playersCount: number;
}

const RoomLink = (props: RoomLinkProps) => {
  return (
    <div
      style={{
        display: "flex",
        height: "45px",
        alignItems: "center",
        width: "100%",
        maxWidth: "550px",
      }}
    >
      <PlayersCount count={props.playersCount} />
      <div
        style={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
          border: "1.5px solid #B0B8D120",
          borderLeft: "none",
          borderTop: "1.5px solid #B0B8D120",
          borderBottom: "1.5px solid #B0B8D120",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        {/* Room Link */}
        <p
          style={{
            color: "#b0b8d1",
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          {props.roomId}
        </p>

        {/* CopyLink Button */}
        <CopyLink roomLink={props.roomId} />
      </div>
    </div>
  );
};

function CopyLink({ roomLink }: { roomLink: string }) {
  const [isCopyed, setIsCopyed] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomLink);
    setIsCopyed(true);
  };

  useEffect(() => {
    let timeoutId;
    if (isCopyed) {
      timeoutId = setTimeout(() => setIsCopyed(false), 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [isCopyed]);

  return (
    <SecondryButton
      onClick={handleCopyLink}
      text={isCopyed ? "Copied" : "Copy link"}
    />
  );
}

function PlayersCount({ count }: { count: number }) {
  return (
    <div
      style={{
        height: "100%",
        width: "120px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        border: "1.5px solid #B0B8D120",
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <p
        style={{
          color: "#b0b8d1",
          fontSize: "20px",
          fontWeight: "500",
          margin: "0px",
        }}
      >
        {count}
      </p>
      <p
        style={{
          color: "#b0b8d128",
          fontSize: "12px",
          fontWeight: "200",
          margin: "0px",
        }}
      >
        Players Joined
      </p>
    </div>
  );
}

export default RoomLink;
