import React, { ChangeEvent, useState } from 'react';
import './Navigation.scss';

function Navigation() {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header>
      <div id="logo">youRang</div>
      <div id="navSearch">
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="지역, 숙소명을 입력하세요"
          autoComplete="off"
        />
      </div>
      <div id="navMenus">
        <div id="navProfile">Around</div>
        <div id="navProfile">Help</div>
        <div id="navProfile">Profile</div>
      </div>
    </header>
  );
}

export default Navigation;
