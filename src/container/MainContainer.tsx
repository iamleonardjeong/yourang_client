import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Mypage from './Mypage';
import Main from './Main';
import Navigation from './Navigation';

const ConCon = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Route path="/main" exact component={Main} />
        <Route path="/main/profile" exact component={Mypage} />
      </Router>
      {/* <Main />
      <Mypage /> */}
    </>
  );
};

export default ConCon;
