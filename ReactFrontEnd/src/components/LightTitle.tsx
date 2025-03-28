const LightTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      style={{
        fontSize: "23px",
        fontWeight: "100",
        color: "#ffffff",
        opacity: "0.9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {children}
    </div>
  );
};

export default LightTitle;
