import React, { ChangeEvent, FormEvent, useState } from 'react';
import '../styles/Navigation.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;
// const history = useHistory();

interface NavigationProps {
  searchBarInputHandler: (value: string) => void;
  currentPlaceInfo: any;
  isLoggedIn: boolean;
  signInModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

function Navigation({
  searchBarInputHandler,
  currentPlaceInfo,
  isLoggedIn,
  signInModalHandler,
}: NavigationProps) {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header>
      <div id="logo">
        <Link to={{ pathname: '/main', state: currentPlaceInfo }}>YouRang</Link>
      </div>
      <div id="navSearch">
        <input
          onKeyPress={(e: any) => searchBarInputHandler(e)}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="지역, 숙소명을 입력하세요"
          autoComplete="off"
        />
      </div>
      <div id="navMenus">
        <div id="navProfile">
          <Link to={{ pathname: '/main', state: currentPlaceInfo }}>지도</Link>
        </div>
        <div id="navProfile">
          {isLoggedIn ? (
            <Link to={{ pathname: '/main/profile', state: currentPlaceInfo }}>
              내 정보
            </Link>
          ) : (
            <a onClick={signInModalHandler}>로그인</a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
