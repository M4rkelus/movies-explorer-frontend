import './FilterCheckbox.styles.css';

const FilterCheckbox = ({ isShortMovies, onFilterCheckbox }) => {
  return (
    <label className='filter'>
      <input
        className='filter__checkbox'
        type='checkbox'
        onChange={onFilterCheckbox}
        checked={isShortMovies ? true : false}
      />
      <span className='filter__tumbler'></span>
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
