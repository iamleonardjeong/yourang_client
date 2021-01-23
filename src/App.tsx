import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './container/Home';
import MainContainer from './container/MainContainer';

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
