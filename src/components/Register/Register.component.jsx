import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import logo from '../../images/logo.svg';

import './Register.styles.css';

const Register = ({ onRegister, isSubmitting }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className='register'>
      <div className='register__top'>
        <Link to='/' className='register__logo-link'>
          <img src={logo} alt='Лого' className='register__logo' />
        </Link>
        <h1 className='register__title'>Добро пожаловать!</h1>
      </div>
      <form
        id='submit'
        className='register__form'
        name='register'
        onSubmit={handleSubmit}
      >
        <div className='register__labels-container'>
          <label className='register__label'>
            <span className='register__label-text'>Имя</span>
            <input
              name='name'
              className='register__input'
              onChange={handleChange}
              value={values.name ?? ''}
              type='text'
              required
              minLength='2'
              maxLength='30'
            />
            <span className='register__error'>{errors.name ?? ''}</span>
          </label>
          <label className='register__label'>
            <span className='register__label-text'>E-mail</span>
            <input
              name='email'
              className='register__input'
              onChange={handleChange}
              value={values.email ?? ''}
              type='email'
              required
            />
            <span className='register__error'>{errors.email ?? ''}</span>
          </label>
          <label className='register__label'>
            <span className='register__label-text'>Пароль</span>
            <input
              name='password'
              className='register__input'
              onChange={handleChange}
              value={values.password || ''}
              type='password'
              required
              minLength='6'
              maxLength='30'
            />
            <span className='register__error'>{errors.password ?? ''}</span>
          </label>
        </div>
      </form>
      <div className='register__bottom'>
        <button
          type='submit'
          form='submit'
          className='register__button'
          disabled={!isValid || isSubmitting}
        >
          Зарегистрироваться
        </button>
        <span className='register__assist'>
          Уже зарегистрированы?&nbsp;&nbsp;
          <Link to='/signin' className='register__link'>
            Войти
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Register;
