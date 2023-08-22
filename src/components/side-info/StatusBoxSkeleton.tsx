import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StatusBoxSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="right-col">
        <Skeleton
          style={{
            height: "152px",
          }}
        />
      </div>
    </div>
  );
};
export default StatusBoxSkeleton;
