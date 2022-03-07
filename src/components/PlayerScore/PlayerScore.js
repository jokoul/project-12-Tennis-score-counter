import { useSelector } from "react-redux";
import "./PlayerScore.scss";
import {
  selectPlayerHasAdvantage,
  selectPlayerScore,
} from "../../utils/selectors";

export function PlayerScore({ playerId, playerName }) {
  const score = useSelector(selectPlayerScore(playerId));
  const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));
  return (
    <div className="player-games">
      <p>{playerName}</p>
      <p>{(hasAdvantage ? "Avantage - " : "") + score}</p>
    </div>
  );
}
