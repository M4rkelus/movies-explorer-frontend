import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ERROR_MESSAGES } from '../../utils/constants';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.component';

import './SearchForm.styles.css';

const SearchForm = ({
  isShortMovies,
  onSearch,
  onFilterCheckbox,
  setIsErrorMessage,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentLocation = useLocation();
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(values.search);
  };

  // Get search value from localStorage
  useEffect(() => {
    if (
      currentLocation.pathname === '/movies' &&
      localStorage.getItem(`${currentUser.email} - movieSearch`)
    ) {
      values.search = localStorage.getItem(
        `${currentUser.email} - movieSearch`
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentLocation.pathname === '/movies' && !values.search)
      setIsErrorMessage({
        isShown: true,
        message: ERROR_MESSAGES.EMPTY_INPUT,
      });
  }, [values, currentUser.email, currentLocation.pathname]);

  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={handleSubmit}
        >
          <input
            className='search__input'
            name='search'
            type='text'
            placeholder='Фильм'
            autoComplete='off'
            value={values.search || ''}
            onChange={handleChange}
            required
          />
          <span className='search__error'>{errors.search ?? ''}</span>
          <button
            className='search__button'
            type='submit'
            disabled={!isValid}
          ></button>
        </form>
        <FilterCheckbox
          isShortMovies={isShortMovies}
          onFilterCheckbox={onFilterCheckbox}
        />
      </div>
    </section>
  );
};

export default SearchForm;
