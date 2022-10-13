import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

import './Login.styles.css';

const Login = () => {
  const [isValid, setIsValid] = useState(true); // TODO validation
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className='login'>
      <div className='login__top'>
        <Link to='/' className='login__link'>
          <img src={logo} alt='Логотип' className='login__logo' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
      </div>
      <form
        className='login__form'
        name='login'
        noValidate
        // onSubmit={} TODO
      >
        <div className='login__labels-container'>
          <label className='login__label'>
            <span className='login__label-text'>E-mail</span>
            <input
              name='email'
              className='login__input'
              onChange={handleChange}
              value={values.email || ''}
              type='email'
              required
            />
            <span className='login__error'></span>
          </label>
          <label className='login__label'>
            <span className='login__label-text'>Пароль</span>
            <input
              name='password'
              className='login__input'
              onChange={handleChange}
              value={values.password || ''}
              type='password'
              required
            />
            <span className='login__error'></span>
          </label>
        </div>
      </form>
      <div className='login__bottom'>
        <button type='submit' className='login__button' disabled={!isValid}>
          Войти
        </button>
        <span className='login__assist'>
          Ещё не зарегистрированы?&nbsp;&nbsp;
          <Link to='/signup' className='login__link'>
            Регистрация
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Login;
