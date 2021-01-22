import React, { ChangeEvent, useState } from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom';

function Navigation() {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header>
      <div id="logo">
        <Link to="/main">youRang</Link>
      </div>
      <div id="navSearch">
        <form>
          <input
            onChange={onChange}
            value={value}
            type="text"
            placeholder="지역, 숙소명을 입력하세요"
            autoComplete="off"
          />
        </form>
      </div>
      <div id="navMenus">
        <div id="navProfile">
          <Link to="/main">Home</Link>
        </div>
        <div id="navProfile">Help</div>
        <div id="navProfile">
          <Link to="/main/profile">Profile</Link>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
