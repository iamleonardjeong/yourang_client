import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Mypage from '../components/Mypage';
import Main from '../components/Main';
import Navigation from '../components/Navigation';
import { getLocation } from '../helper/getLocation';

const MainContainer = () => {
  const [navPlaceInfo, setNavPlaceInfo] = useState({});
  const [currentPlaceInfo, setCurrentPlaceInfo] = useState({});

  const curretPlaceInfoHandler = (curPlaceInfo: any) => {
    setCurrentPlaceInfo(curPlaceInfo);
  };

  const searchBarInputHandler = async (input: any) => {
    //유저가 Main콤포넌트 Nav바에 검색한 장소
    const navPlaceInput = input.target.defaultValue;

    if (input.key === 'Enter') {
      // 장소릃 입력하고 {좌표, 장소들정보 배열, 사용자가 입력한장소(string)}이 리턴 됨.
      const placeInfo = await getLocation(navPlaceInput);
      setNavPlaceInfo(placeInfo);
    }
  };

  return (
    <>
      <Router>
        <Navigation
          searchBarInputHandler={searchBarInputHandler}
          currentPlaceInfo={currentPlaceInfo}
        />
        <Route
          path="/main"
          exact
          render={() => (
            <Main
              navPlaceInfo={navPlaceInfo}
              curretPlaceInfoHandler={curretPlaceInfoHandler}
            />
          )}
        />
        <Route path="/main/profile" exact component={Mypage} />
      </Router>
    </>
  );
};

export default MainContainer;
