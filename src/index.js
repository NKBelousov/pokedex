import { Provider } from "mobx-react";
import { MobxRouter, startRouter } from "mobx-router";
import React from "react";
import ReactDOM from "react-dom";

import store from "./stores";
import views from "./views";

startRouter(views, store);

ReactDOM.render(
  <Provider store={store}>
    <MobxRouter />
  </Provider>,
  document.getElementById("root")
);
