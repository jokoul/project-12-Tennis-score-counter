import "./App.scss";
import { Display } from "./components/Display/Display";
import PlayerPoints from "./components/PlayerPoints/PlayerPoints";
import { PlayerScore } from "./components/PlayerScore/PlayerScore";
import { PlayPauseButton } from "./components/PlayPauseButton/PlayPauseButton";
import { PointScoredButton } from "./components/PointScoredButton/PointScoredButton";
import { ResetButton } from "./components/ResetButton/ResetButton";

function App() {
  /* //createStore fn nedd 2 parameters : state and reducer
const store = createStore(reducer, initialState)*/

  return (
    <div className="App">
      <h1>Tennis score counter</h1>
      <div className="container">
        <h2>Game history</h2>
        <PlayerPoints playerId="player1" playerName="player1" />
        <PlayerPoints playerId="player2" playerName="player2" />
        <h2>Score Display</h2>
        <Display />
        <h2>Individual score</h2>
        <PlayerScore playerId="player1" playerName="player1" />
        <PlayerScore playerId="player2" playerName="player2" />
        <div className="buttonsWrapper">
          <div className="topBtn">
            <PointScoredButton playerId="player1">
              {" "}
              Point Joueur 1
            </PointScoredButton>
            <PointScoredButton playerId="player2">
              {" "}
              Point Joueur 2
            </PointScoredButton>
          </div>
          <div className="belowBtn">
            <ResetButton />
            <PlayPauseButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
