import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Mypage from './Mypage';
import Main from './Main';
import Navigation from './Navigation';

const MainContainer = () => {
  const [data, setData] = useState({
    data: 'okok',
  });

  const submit = (form: { data: string; foo: string }) => {
    console.log(form);
  };

  return (
    <>
      <Router>
        <Navigation submit={submit} />
        <Route path="/main" exact component={Main} />
        <Route path="/main/profile" exact component={Mypage} />
        <Route path="/main" exact component={Main} />
      </Router>
      {/* <Main />
      <Mypage /> */}
    </>
  );
};

export default MainContainer;
