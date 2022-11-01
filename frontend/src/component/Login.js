import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import * as auth from '../utils/auth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          props.handleLogin();
          history.push('/');
        } else {
          console.log('Некорректно заполнено одно из полей');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      <Header />
      <div className="login">
        <h1 className="login__header">Вход</h1>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__input login__input_type_email"
            placeholder="Email" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input login__input_type_password"
            placeholder="Пароль" />
          <button className="login__button login__button_type_enter" type="submit">Войти</button>
        </form>
      </div>
    </>
  );
}

export default Login;
