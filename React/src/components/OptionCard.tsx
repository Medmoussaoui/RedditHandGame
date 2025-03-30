import { useState } from "react";
import SecondryButton from "./SecndryButton";

interface OptionCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

function OptionCard(props: OptionCardProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        props.onClick?.();
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        border: "1px solid #B0B8D125",
        borderRadius: "20px",
        paddingTop: "10px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "239px",
        width: "199px",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={props.icon}
          alt={props.title}
          style={{ width: "40px", padding: "30px 0px" }}
        />
        <TitleAndDescription title={props.title} desc={props.description} />
      </div>
      <SecondryButton
        text="Select"
        isActive={isHover}
        height="45px"
        width="100%"
        onClick={props.onClick}
      />
    </div>
  );
}

function TitleAndDescription({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <p
        style={{
          fontSize: "23px",
          fontWeight: "400",
          margin: "0px",
          opacity: "0.9",
        }}
      >
        {title}
      </p>
      <p
        style={{
          marginTop: "7px",
          fontSize: "14px",
          fontWeight: "100",
          color: "#B0B8D1",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default OptionCard;
