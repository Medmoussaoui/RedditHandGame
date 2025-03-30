import { useNavigate } from "react-router-dom";

interface AppBarProps {
  autoBack?: boolean;
  clickBack?: () => void;
  children?: React.ReactNode;
}

function AppBar(props: AppBarProps) {
  return (
    <div
      style={{
        margin: "0px",
        padding: "0px 15px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
      }}
    >
      {props.autoBack && <ArrowBackButton onTap={props.clickBack} />}
      {props.children}
    </div>
  );
}

function ArrowBackButton({
  onTap,
  hint,
}: {
  onTap?: () => void;
  hint?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
        navigate(-1);
        onTap && onTap();
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img src="assets/arrow.png" alt="" width={"45px"} />

      <p
        style={{
          fontSize: "20px",
          fontWeight: "300",
          color: "#B0B8D120",
        }}
      >
        {" "}
        {hint ? hint : "Back"}
      </p>
    </div>
  );
}

export default AppBar;
