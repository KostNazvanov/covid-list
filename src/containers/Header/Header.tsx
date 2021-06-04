import React from 'react';

import Logo from '../../assets/Logo';
import './Header.css';

export default () => {
  return (
    <div className="header">
      <div className="header__logo"><Logo/></div>
      <div className="header__user-menu">
        <div className="header__user-menu__username">Kostia</div>
        <div className="header__user-menu__avatar">NK</div>
      </div>
    </div>
  )
}
