import "../styles.css";

interface ClickableTextProps {
  text: string;
  onClick: () => void;
}

const ClickableText = (props: ClickableTextProps) => {
  return (
    <p
      onClick={props.onClick}
      className="clicableText"
      style={{
        color: "#9B59B6",
        textDecoration: "none",
        fontWeight: "100",
        fontSize: "20px",
        cursor: "pointer",
        textDecorationLine: "underline",
      }}
    >
      {props.text}
    </p>
  );
};

export default ClickableText;
