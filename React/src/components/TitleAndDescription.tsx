interface TitleAndDescriptionProps {
  title: string;
  desc: string;
}

function TitleAndDescription(props: TitleAndDescriptionProps) {
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <p
        style={{
          opacity: "0.9",
          fontWeight: "600",
          fontSize: "30px",
          padding: "0px",
          margin: "0px",
        }}
      >
        {props.title}
      </p>
      <p
        style={{
          marginTop: "10px",
          fontSize: "20px",
          fontWeight: "100",
          color: "#B0B8D1",
        }}
      >
        {props.desc}
      </p>
    </div>
  );
}

export default TitleAndDescription;
