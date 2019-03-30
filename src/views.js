import React from "react";
import { Route } from "mobx-router";

import Index from "./components/Index";
import Profile from "./components/Profile";

const views = {
  index: new Route({
    path: "/",
    component: <Index />,
  }),
  profile: new Route({
    path: "/pokemon/:name",
    component: <Profile />,
  }),
};

export default views;
