import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Mypage from './components/Mypage';
import Home from './container/Home';
import MainContainer from './container/MainContainer';

function App() {
  return (
    <>
      {/* <Router> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/main" render={() => <MainContainer />} />
        <Route exact path="/main/profile" component={Mypage} />
        {/* <Redirect path="*" to="/main" /> */}
      </Switch>
      {/* </Router> */}
    </>
  );
}

export default App;
