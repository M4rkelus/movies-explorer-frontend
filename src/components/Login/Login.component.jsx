import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import logo from '../../images/logo.svg';

import './Login.styles.css';

const Login = ({ onLogin, isSubmitting }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className='login'>
      <div className='login__top'>
        <Link to='/' className='login__logo-link'>
          <img src={logo} alt='Логотип' className='login__logo' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
      </div>
      <form
        id='login'
        className='login__form'
        name='login'
        onSubmit={handleSubmit}
      >
        <div className='login__labels-container'>
          <label className='login__label'>
            <span className='login__label-text'>E-mail</span>
            <input
              name='email'
              className='login__input'
              onChange={handleChange}
              value={values.email ?? ''}
              type='email'
              required
            />
            <span className='login__error'>{errors.email ?? ''}</span>
          </label>
          <label className='login__label'>
            <span className='login__label-text'>Пароль</span>
            <input
              name='password'
              className='login__input'
              onChange={handleChange}
              value={values.password ?? ''}
              type='password'
              required
            />
            <span className='login__error'>{errors.password ?? ''}</span>
          </label>
        </div>
      </form>
      <div className='login__bottom'>
        <button
          type='submit'
          form='login'
          className='login__button'
          disabled={!isValid || isSubmitting}
        >
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
