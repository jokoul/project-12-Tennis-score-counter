export const selectDisplayText = (state) => {
  if (state.winner) {
    if (state.winner === "player1") {
      return state.playerName1 + " gagne le jeu";
    } else {
      return state.playerName2 + " gagne le jeu";
    }
  } else {
    let text = "le score est: " + state.player1 + " - " + state.player2;
    if (state.advantage) {
      if (state.advantage === "player1") {
        text += " avantage joueur 1";
      } else {
        text += " avantage joueur 2";
      }
    }
    return text;
  }
};

export const selectPlayerPoints = (playerId) => {
  return (state) =>
    state.history.filter((item) => item.winner === playerId).length;
};

export const selectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId;
};

export const selectPlayerScore = (playerId) => {
  return (state) => state[playerId];
};

export const selectGameIsPlaying = (state) => {
  return state.playing;
};

//Affiche le formulaire de changement de nom
export const formAppear = (state) => {
  return state.toggleName;
};

export const showName1 = (state) => {
  return state.playerName1;
};
export const showName2 = (state) => {
  return state.playerName2;
};
