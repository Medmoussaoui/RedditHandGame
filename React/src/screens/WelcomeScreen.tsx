import TitleAndDescription from "../components/TitleAndDescription";
import SecondryButton from "../components/SecndryButton";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
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
      <img src="assets/logo.png" alt="" />
      <TitleAndDescription
        title="The Classic Battle"
        desc="Strategy or chance? Only the lucky will win! "
      />
      <SecondryButton
        text="Enter The Area"
        height="55px"
        width="28%"
        isActive={true}
        borderRadius="15px"
        fontSize="16px"
        onClick={() => navigate("/howToPlay", { replace: true })}
      />
    </div>
  );
};

export default WelcomeScreen;
