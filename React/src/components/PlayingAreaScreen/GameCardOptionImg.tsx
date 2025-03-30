interface GameCardOptionImgProps {
  imgPath: string;
  isSelected?: boolean;
  onClick?: () => void;
}

function GameCardOptionImg(props: GameCardOptionImgProps) {
  return (
    <img
      onClick={props.onClick}
      className={
        props.isSelected
          ? "game-card-option-selected"
          : "game-card-option-unselected"
      }
      style={{
        height: "80px",
      }}
      src={props.imgPath}
      alt=""
    />
  );
}

export default GameCardOptionImg;
