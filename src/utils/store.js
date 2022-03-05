import { createStore } from "redux";
import produce from "immer"; // importation de la fonction produce de immer

// Le state
const initialState = {
  // Le score de chacun des joueurs
  player1: 0,
  player2: 0,
  // Si il y a 40-40 quel joueur a l'avantage
  // On utilise null si pas d'avantage
  advantage: null,
  // Qui a gagné ?
  // Si la partie est en cours on utilise null
  winner: null,
  // La partie est-elle en cours ?
  playing: true,
  //historique des jeux
  history: [
    //ex:{player: 15, player2: 40, winner: 'player2'}
  ],
};

// Les actions creators exporté

// mettre en pause / reprendre le jeu
export const playPause = () => ({ type: "playPause" });

// redémarrer le jeu
export const restartGame = () => ({ type: "restart" });

// un joueur a marqué un point
// on passe en paramètre le joueur qui a marqué
export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player },
});

// le reducer contient la logique
// c'est une fonction qui reçoit le state et une action
function reducer(state = initialState, action) {
  // si l'action est de type "restart"
  if (action.type === "restart") {
    return produce(state, (draft) => {
      // si le match est terminé, on ajoute un élément à l'historique
      if (draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner: draft.winner,
        });
      }
      //On réinitialise les propriétés du state
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = true;
    });
  }
  // si l'action est de type "playPause"
  if (action.type === "playPause") {
    if (state.winner) {
      return state;
    }
    //Utilisation de produce de immer pour faciliter les changements du state
    return produce(state, (draft) => {
      draft.playing = !state.playing;
    });
  }
  // lorsqu'un joueur marque un point
  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";
    if (state.winner) {
      // le jeu est fini, on ne peut pas marquer
      // on retourne le state
      return state;
    }
    if (state.playing === false) {
      // le jeu est en pause, on ne peut pas marquer
      // on retourne le state
      return state;
    }
    return produce(state, (draft) => {
      const currentPlayerScore = draft[player];
      if (currentPlayerScore <= 15) {
        // le joueur qui a marqué est à 0 ou 15 => on ajoute 15
        draft[player] = currentPlayerScore + 15;
        return; // return nothing but necessary to stop the script here
      }
      if (currentPlayerScore === 30) {
        // le joueur qui a marqué est à 30 => on passe à 40
        draft[player] += 10;
        return;
      }
      // si le joueur est déjà à 40
      if (currentPlayerScore === 40) {
        // si l'autre joueur n'est pas à 40
        if (draft[otherPlayer] !== 40) {
          // le joueur a gagné !
          draft.winner = player;
          return;
        }
        // si le joueur a l'avantage
        if (draft.advantage === player) {
          // le joueur a gagné !
          draft.winner = player;
          return;
        }
        // si personne n'as l'avantage
        if (draft.advantage === null) {
          // le joueur a maintenant l'avantage !
          draft.advantage = player;
          return;
        }
        // sinon c'est l'autre joueur qui a l'avantage
        // l'autre joueur perd l'avantage
        draft.advantage = null;
        return;
      }
    });
  }
  return state;
}

// on crée le store et on l'exporte pour le rendre disponible dans les autres modules
export const store = createStore(reducer, initialState);

store.subscribe(() => {
  console.log("Nouveau state :");
  console.log(store.getState());
});
