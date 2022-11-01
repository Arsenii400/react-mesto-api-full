import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место - Россия" />
      {pathname === '/' && (<div className="header__data">
        <p className="header__data_type_email">{props.userMail}</p>
        <button onClick={props.onSignOut} className="header__data_type_exit">Выйти</button>
      </div>)}
      {pathname === '/sign-in' && (<div className="header__data">
        <Link to="/sign-up" className="header__data_type_reg">Регистрация</Link>
      </div>)}
      {pathname === '/sign-up' && (<div className="header__data">
        <Link to="/sign-in" className="header__data_type_enter">Войти</Link>
      </div>)}
    </header>)
}

export default Header;
