import "../styles.css";

interface SecndryButtonProps {
  text: string;
  isActive?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
  fontSize?: string;
  className?: string;
  onClick?: () => void;
}

const SecondryButton = (props: SecndryButtonProps) => {
  // Merge inline styles with default state
  const dynamicStyle = {
    color: props.isActive ? "white" : undefined,
    backgroundColor: props.isActive ? "#8E44AD" : undefined,
    width: props.width ?? "90px",
    height: props.height ?? undefined,
    borderRadius: props.borderRadius,
    fontSize: props.fontSize,
  };

  return (
    <button
      className={"secondaryButton" + " " + (props.className ?? " ")}
      style={dynamicStyle}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default SecondryButton;
