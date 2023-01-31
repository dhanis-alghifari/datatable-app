import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import Home from "./layout/Home";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/" component={Home} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);
