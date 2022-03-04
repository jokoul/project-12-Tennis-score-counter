// importation du hook useSelector depuis react-redux
import { useSelector } from "react-redux";
import "./Display.scss";

export function Display() {
  //Utilisation de useSelector avec en pâramètre une fonction
  //qui permet de récupérer uniquement la propriété "playing" du state
  const gameIsPlaying = useSelector((state) => state.playing);
  const winner = useSelector((state) => state.winner);
  const player1Score = useSelector((state) => state.player1);
  const player2Score = useSelector((state) => state.player2);
  const advantage = useSelector((state) => state.advantage);

  if (winner) {
    if (winner === "player1") {
      return <p className="broadcast">Jouer 1 gagne</p>;
    } else {
      return <p className="broadcast">Jouer 2 gagne</p>;
    }
  } else if (gameIsPlaying === false) {
    return <p className="broadcast">C'est la pause</p>;
  } else {
    let text = "le score est: " + player1Score + " - " + player2Score;
    if (advantage) {
      if (advantage === "player1") {
        text += " avantage joueur 1";
      } else {
        text += " avantage joueur 2";
      }
    }
    //On peut ensuite utiliser cette valeur de la propriété dans le rendu
    return <p className="broadcast">{text}</p>;
  }
}
