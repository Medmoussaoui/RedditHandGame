function BackStep({ onClick }: { onClick?: () => void }) {
  return (
    <p
      onClick={onClick}
      className="clicableText"
      style={{
        fontSize: "18px",
        fontWeight: "100",
        padding: "0px",
        marginTop: "10px",
        color: "#B0B8D1",
        cursor: "pointer",
      }}
    >
      {" "}
      ← back steep{" "}
    </p>
  );
}

export default BackStep;
