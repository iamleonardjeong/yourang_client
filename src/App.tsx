import React, { useState } from 'react';
import Home from './container/Home';
import Navigation from './container/Navigation';
import Main from './container/Main';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClick = () => {
    setIsLoggedIn((prev) => !prev);
  };
  return (
    <>
      <button onClick={onClick} style={{ zIndex: 100, position: 'fixed' }}>
        Btn
      </button>
      {isLoggedIn ? (
        <>
          <Navigation />
          <Main />
          {/* <Mypage /> */}
        </>
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
