import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Profile.styles.css';

const Profile = ({ onSignOut, onSubmit }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    if (currentUser) resetForm(currentUser, {}, true);
  }, [currentUser, resetForm]);

  return (
    <main className='profile'>
      <h1 className='profile__title'>{`Привет, ${currentUser.name ?? ''}!`}</h1>
      <form
        id='submit'
        className='profile__form'
        name='profile'
        onSubmit={handleSubmit}
      >
        <div className='profile__labels-container'>
          <label className='profile__label'>
            <span className='profile__label-text'>Имя</span>
            <input
              className='profile__input'
              name='name'
              type='text'
              value={values.name ?? ''}
              required
              minLength='2'
              maxLength='30'
              onChange={handleChange}
            />
          </label>
          <span className='profile__input-error profile__input-error_name'>
            {errors.name ?? ''}
          </span>
          <label className='profile__label'>
            <span className='profile__label-text'>E-mail</span>
            <input
              className='profile__input'
              name='email'
              type='email'
              value={values.email ?? ''}
              required
              onChange={handleChange}
            />
          </label>
          <span className='profile__input-error profile__input-error_email'>
            {errors.email ?? ''}
          </span>
        </div>
      </form>
      <div className='profile__buttons-container'>
        <button
          form='submit'
          type='submit'
          className='profile__button-edit'
          disabled={!isValid}
        >
          Редактировать
        </button>
        <button
          type='button'
          className='profile__button-exit'
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
};

export default Profile;
