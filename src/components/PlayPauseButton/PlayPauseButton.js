// a) Importation du hook "useDispatch" depuis react-redux
import { useSelector, useStore } from "react-redux";
import { selectGameIsPlaying } from "../../utils/selectors";
import { autoplay } from "../../utils/store";
import "./PlayPauseButton.scss";

export function PlayPauseButton() {
  // b) Utilisation du hook dans le composant
  //pour récupérer la fonction "dispatch" de redux
  const store = useStore();
  const isPlaying = useSelector(selectGameIsPlaying);

  return (
    <button
      className="btn"
      onClick={() => {
        autoplay(store);
      }}
    >
      {isPlaying ? "Jeu en cours" : "Simuler un jeu"}
    </button>
  );
}

////////////////////////////////////////////////////////////////////////////////
/*
export function PlayPauseButton() {
  const store = useStore();
  const playing = useSelector(selectGameIsPlaying);

  return (
    <button
      className="button"
      onClick={() => {
        autoplay(store);
      }}
    >
      {playing ? "Jeu en cours..." : "Jouer"}
    </button>
  );
}
*/
