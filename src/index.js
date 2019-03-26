import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import pokemonStore from "./stores/pokemonsStore";

ReactDOM.render(
  <Provider pokemonStore={pokemonStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
