import './FilterCheckbox.styles.css';

const FilterCheckbox = () => {
  return (
    <label className='filter'>
      <input
        className='filter__checkbox'
        type='checkbox'
        // onChange={} TODO
        // checked={}
      />
      <span className='filter__tumbler'></span>
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
