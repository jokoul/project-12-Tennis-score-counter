import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import { store } from "./utils/store";

const reactElement = document.getElementById("root");

ReactDOM.render(
  //Le composant "Provider" de rect-redux doit englober toute l'application pour permettre à useSelector et useDispatch d'accéder au store
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  reactElement
);
