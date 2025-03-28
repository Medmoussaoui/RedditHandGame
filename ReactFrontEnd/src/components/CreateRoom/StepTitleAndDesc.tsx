interface StepTitleAndDescProps {
  step: number;
  desc: string;
}

function StepTitleAndDesc(props: StepTitleAndDescProps) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <p
        style={{
          color: "#ffffff",
          opacity: "0.9",
          fontSize: "23px",
          fontWeight: "300",
          margin: 0,
          padding: 0,
        }}
      >
        Sleep {props.step}
      </p>
      <p
        style={{
          color: "#B0B8D1",
          fontSize: "16px",
          fontWeight: "100",
          margin: 0,
          padding: 0,
        }}
      >
        {props.desc}
      </p>
    </div>
  );
}

export default StepTitleAndDesc;
