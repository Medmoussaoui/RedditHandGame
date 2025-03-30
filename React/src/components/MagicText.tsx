import React from "react";

interface MagicTextProps {
  text: string;
}

function MagicText(props: MagicTextProps) {
  return (
    <p
      style={{
        padding: "0px",
        margin: "0px",
        fontSize: "20px",
        fontWeight: "100",
        color: "#B0B8D120",
      }}
    >
      {props.text}
    </p>
  );
}

export default MagicText;
