import { useDispatch } from "react-redux";
import { pointScored } from "../../utils/store";

export function PointScoredButton({ playerId, children }) {
  const dispatch = useDispatch();
  return (
    <button
      className="btn"
      onClick={() => {
        dispatch(pointScored(playerId));
      }}
    >
      {children}
    </button>
  );
}
