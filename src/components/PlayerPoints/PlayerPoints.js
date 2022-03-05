import "./PlayerPoints.scss";
import React from "react";
import { useSelector } from "react-redux";
import { selectPlayerPoints } from "../../utils/selectors";

export default function PlayerPoints({ playerId, playerName }) {
  const numberOfWin = useSelector(selectPlayerPoints(playerId));
  return (
    <div className="history-games">
      <p>{playerName}</p>
      <p>
        {numberOfWin === 0
          ? "Aucun jeu gagné"
          : numberOfWin === 1
          ? "1 jeu gagné"
          : `${numberOfWin} jeux gagnés`}
      </p>
    </div>
  );
}
