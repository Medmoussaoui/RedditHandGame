import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RoomCardSkeleton = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#B0B8D105",
        borderRadius: "13px",
        padding: "10px",
        width: "330px",
      }}
    >
      <SkeletonTheme
        baseColor="#B0B8D110"
        highlightColor="#B0B8D150"
        enableAnimation={true}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <CircleCount />
          <RoomNameAndPlayers />
        </div>
      </SkeletonTheme>
    </div>
  );
};

function RoomNameAndPlayers() {
  return (
    <div>
      <Skeleton width={"90px"} height={"17px"} />
      <Skeleton width={"50px"} height={"12px"} />
    </div>
  );
}

function CircleCount() {
  return <Skeleton width={"50px"} height={"50px"} circle={true} />;
}

export default RoomCardSkeleton;
