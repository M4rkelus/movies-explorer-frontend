import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.component';

import './SearchForm.styles.css';

const SearchForm = () => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className='search'>
      <div className='search__container'>
        <form
          className='search__form'
          name='search'
          noValidate
          // onSubmit={} TODO
        >
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
        <FilterCheckbox />
      </div>
    </section>
  );
};

export default SearchForm;
