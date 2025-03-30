function StepsDot({ steps, position }: { steps: number; position: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        marginBottom: "15px",
      }}
    >
      {[...Array(steps).keys()].map((dot) => (
        <div
          key={dot}
          style={{
            width: dot === position ? "18px" : "10px",
            height: "10px",
            borderRadius: dot === position ? "20px" : "50%",
            backgroundColor: dot === position ? "#8E44AD" : "#8E44AD20",
            transition: "0.5s ease",
          }}
        />
      ))}
    </div>
  );
}

export default StepsDot;
