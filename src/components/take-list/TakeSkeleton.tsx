import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TakeSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className="card-skeleton" key={i}>
        <div className="right-col">
          <Skeleton
            count={2}
            style={{
              marginTop: "1.4rem",
              height: "100px",
            }}
          />
        </div>
      </div>
    ));
};
export default TakeSkeleton;
