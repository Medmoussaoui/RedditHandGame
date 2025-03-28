import MagicText from "../components/MagicText";
import TitleAndDescription from "../components/TitleAndDescription";
import OptionCard from "../components/OptionCard";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
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
      <TitleAndDescription
        title="Select How To Play"
        desc="Join a room or create your own and invite friends!"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <OptionCard
          {...{
            icon: "/assets/link.png",
            title: "Join Room",
            description: "and challenge others",
            onClick: () => navigate("/joinRoom"),
          }}
        />
        <OptionCard
          {...{
            icon: "/assets/create.png",
            title: "Create Room",
            description: "and challenge your friends",
            onClick: () => navigate("/createRoom"),
          }}
        />
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <MagicText text="No Guts, No Glory—Enter the Arena!" />
      </div>
    </div>
  );
}

export default HomeScreen;
