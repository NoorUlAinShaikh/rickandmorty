import React from "react";
import EpisodesList from "../components/EpisodesList";
import Errors from "../components/Errors";
import Header from "../components/Header";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const App = () => {
  return (
    <Router history={history}>
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/episodes" component={EpisodesList} />
          <Route exact path="/error" component={Errors} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
