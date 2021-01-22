import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./container/Home";
import Navigation from "./container/Navigation";
import Main from "./container/Main";
import Mypage from "./container/Mypage";
import NoMatch from "./container/NoMatch";
import MainContainer from "./container/MainContainer";

// 테스트다

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/main" exact component={MainContainer} />
          <Redirect path="*" to="/main" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
