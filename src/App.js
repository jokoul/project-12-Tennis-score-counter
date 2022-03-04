import "./App.scss";
import { Display } from "./components/Display/Display";
import { PlayPauseButton } from "./components/PlayPauseButton/PlayPauseButton";
import { PointScoredButton } from "./components/PointScoredButton/PointScoredButton";
import ResetButton from "./components/ResetButton/ResetButton";

function App() {
  /* //createStore fn nedd 2 parameters : state and reducer
const store = createStore(reducer, initialState)*/

  return (
    <div className="App">
      <h1>Tennis score counter</h1>
      <div className="container">
        <Display />
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
