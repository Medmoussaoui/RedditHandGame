import SecondryButton from "../SecndryButton";
import StepTitleAndDesc from "./StepTitleAndDesc";

interface StepFormProps {
  step: number;
  desc: string;
  buttonTitle?: string;
  children?: React.ReactNode;
  onContinue?: () => void;
}

function StepForm(props: StepFormProps) {
  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: "transparent", // Dark background
        borderRadius: "20px",
        width: "290px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        border: "1px solid #B0B8D120",
      }}
    >
      <StepTitleAndDesc step={props.step} desc={props.desc} />
      {props.children}
      <SecondryButton
        className="clicableText"
        onClick={props.onContinue}
        text={props.buttonTitle ?? "Continue"}
        isActive={true}
        height="52px"
        width="100%"
        borderRadius="13px"
        fontSize="15px"
      />
    </div>
  );
}

export default StepForm;
