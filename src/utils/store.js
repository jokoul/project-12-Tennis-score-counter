import { createStore } from "redux";
import produce from "immer"; // importation de la fonction produce de immer

// Le state
const initialState = {
  playerName1: "player1",
  playerName2: "player2",
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
  playing: false, //le jeu est en pause à l'état initial
  //historique des jeux
  history: [
    //ex:{player: 15, player2: 40, winner: 'player2'}
  ],
  toggleName: false,
};

// Les actions creators exporté

// mettre en pause / reprendre le jeu
export const setPlaying = (playing) => ({
  type: "setPlaying",
  payload: playing,
});

// redémarrer le jeu
export const restartGame = () => ({ type: "restart" });

// un joueur a marqué un point
// on passe en paramètre le joueur qui a marqué
export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player },
});
//Bascule toggleName
export const showForm = () => ({
  type: "showHide",
});
//action pour changer le nom
export const changePlayerName = (name1, name2) => ({
  type: "rename",
  payload: {
    playerName1: name1,
    playerName2: name2,
  },
});
//action autoplay
export const autoplay = (store) => {
  // c) au click, on exécute la fonction store
  const isPlaying = store.getState().playing;
  if (isPlaying || store.getState().winner) {
    //déjà en train de jouer, donc on ne fait rien
    return;
  }
  //On indique que la partie est en cours
  store.dispatch(setPlaying(true));
  console.log(store.getState().playing);
  playNextPoint();
  function playNextPoint() {
    //le jeu est-il toujours en cours ?
    if (store.getState().playing === false) {
      //si non, on ne fait rien
      return;
    }
    const time = 1000 + Math.floor(Math.random() * 2000);
    // on utilise setTimeout pour attendre 2 secondes
    window.setTimeout(() => {
      if (store.getState().playing === false) {
        //si non, on ne fait rien
        return;
      }
      //si oui, on marque un peu aléatoire
      const pointWinner = Math.random() > 0.5 ? "player1" : "player2";
      store.dispatch(pointScored(pointWinner));
      console.log(store.getState().winner);
      if (store.getState().winner) {
        //on remet le jeu en pause
        store.dispatch(setPlaying(false));
        console.log(store.getState().playing);
        return;
      }
      playNextPoint();
    }, time);
  }
};

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
      //draft.playerName1 = "player1";
      //draft.playerName2 = "player2";
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = false;
    });
  }
  // si l'action est de type "setPlaying"
  if (action.type === "setPlaying") {
    //Utilisation de produce de immer pour faciliter les changements du state
    return produce(state, (draft) => {
      draft.playing = action.payload;
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
  if (action.type === "showHide") {
    return produce(state, (draft) => {
      draft.toggleName = !draft.toggleName;
    });
  }
  if (action.type === "rename") {
    return produce(state, (draft) => {
      draft.playerName1 = action.payload.playerName1;
      draft.playerName2 = action.payload.playerName2;
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

/////////////////////////////////////////////////////////////////////////////////////////////////
/*
import { createStore } from "redux";
import produce from "immer";

// state
const initialState = {
  player1: 0,
  player2: 0,
  advantage: null,
  winner: null,
  playing: false,
  // historique des jeux joués
  history: [
    // { player1: 15, player2: 40, winner: "player2" }
  ],
};

// actions creators

const setPlaying = (playing) => ({
  type: "setPlaying",
  payload: playing,
});

export const restartGame = () => ({ type: "restart" });

export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player },
});

export function autoplay(store) {
  const isPlaying = store.getState().playing;
  if (isPlaying || store.getState().winner) {
    // Déjà entrain de jouer, on ne fait rien
    return;
  }
  // on indique que la partie est en cours
  store.dispatch(setPlaying(true));
  playNextPoint();
  function playNextPoint() {
    if (store.getState().playing === false) {
      return;
    }
    const time = 1000 + Math.floor(Math.random() * 2000);
    window.setTimeout(() => {
      if (store.getState().playing === false) {
        return;
      }
      // si oui on marque un point aléatoire
      const pointWinner = Math.random() > 0.5 ? "player1" : "player2";
      store.dispatch(pointScored(pointWinner));
      if (store.getState().winner) {
        store.dispatch(setPlaying(false));
        return;
      }
      playNextPoint();
    }, time);
  }
}

function reducer(state = initialState, action) {
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
      // puis on reset les autres propriétés
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = false;
    });
  }
  if (action.type === "setPlaying") {
    return produce(state, (draft) => {
      draft.playing = action.payload;
    });
  }
  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";
    if (state.winner) {
      // On ne peut pas marquer de point si le set est terminé
      return state;
    }
    return produce(state, (draft) => {
      const currentPlayerScore = draft[player];
      if (currentPlayerScore <= 15) {
        // 0 ou 15 => on ajoute 15
        draft[player] += 15;
        return;
      }
      if (currentPlayerScore === 30) {
        draft[player] = 40;
        return;
      }
      if (currentPlayerScore === 40) {
        if (draft[otherPlayer] !== 40) {
          // Le joueur à gagné
          draft.winner = player;
          return;
        }
        if (draft.advantage === player) {
          // Le joueur à gagné
          draft.winner = player;
          return;
        }
        if (draft.advantage === null) {
          // Le joueur a maintenant l'avantage
          draft.advantage = player;
          return;
        }
        // L'autre joueur a perdu l'avantage
        draft.advantage = null;
        return;
      }
    });
  }
  return state;
}

export const store = createStore(reducer);

store.subscribe(() => {
  console.log("Nouveau state:");
  console.log(store.getState());
});
*/
