import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Router } from "./routers";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/api">
          <Router />
        </Route>
        <Route path="/admin">
          <div>어드민</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
