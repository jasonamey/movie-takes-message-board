import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MovieHeaderSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="right-col">
        <Skeleton
          style={{
            height: "600px",
          }}
        />
      </div>
    </div>
  );
};
