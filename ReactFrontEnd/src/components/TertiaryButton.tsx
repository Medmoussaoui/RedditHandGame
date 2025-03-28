import "../styles.css";

interface TertiaryButtonProps {
  title: string;
  onClick?: () => void;
}

const TertiaryButton = (props: TertiaryButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      className="tertiary-button"
      style={{
        height: "48px",
        width: "160px",
        padding: "0px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.title}
    </div>
  );
};

export default TertiaryButton;
