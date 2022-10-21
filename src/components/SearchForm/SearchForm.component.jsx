import { useState, useContext } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.component';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SearchForm.styles.css';

const SearchForm = ({ isShortMovies, onSearch, onFilterCheckbox }) => {
  const [values, setValues] = useState({});

  const currentUser = useContext(CurrentUserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(values.search);
  };

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form' name='search' onSubmit={handleSubmit}>
          <input
            className='search__input'
            name='search'
            type='text'
            placeholder='Фильм'
            autoComplete='off'
            value={values.search ?? ''}
            onChange={handleChange}
            required
          />
          {/* <span className='search__error'>Тут будет ошибка</span> // TODO */}
          <button className='search__button' type='submit'></button>
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
