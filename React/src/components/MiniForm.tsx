import "../styles.css";

function MiniInputForm({
  value,
  onChange,
  type,
  center,
  hint,
  width,
}: {
  value: string;
  onChange: (input: string) => void;
  type?: React.HTMLInputTypeAttribute;
  center?: boolean;
  hint?: string;
  width?: string;
}) {
  return (
    <input
      className="miniInputForm"
      type={type ?? "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={hint ?? ""}
      style={{
        textAlign: center ? "center" : undefined,
        width: width ?? "280px",
        height: "32px",
        padding: "12px",
        backgroundColor: "#FFFFFF01",
        border: "1px solid #B0B8D120",
        borderRadius: "13px",
        outline: "none",
        margin: "0px",
      }}
    />
  );
}

export default MiniInputForm;
