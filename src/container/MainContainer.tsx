import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Mypage from '../components/Mypage';
import Main from '../components/Main';
import Navigation from '../components/Navigation';

const MainContainer = () => {
  const submit = (form: { data: string; foo: string }) => {
    console.log(form);
  };

  return (
    <>
      <Router>
        <Navigation submit={submit} />
        <Route path="/main" exact component={Main} />
        <Route path="/main/profile" exact component={Mypage} />
      </Router>
    </>
  );
};

export default MainContainer;
