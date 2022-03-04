// a) Importation du hook "useDispatch" depuis react-redux
import { useDispatch } from "react-redux";
import "./PlayPauseButton.scss";

export function PlayPauseButton() {
  // b) Utilisation du hook dans le composant
  //pour récupérer la fonction "dispatch" de redux
  const dispatch = useDispatch();

  return (
    <button
      className="btn"
      onClick={() => {
        // c) au click, on exécute la fonction dispatch avec une action
        dispatch({ type: "playPause" });
      }}
    >
      Pause / Reprendre
    </button>
  );
}
