import { useContext, useEffect } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList.component';
import SearchForm from '../SearchForm/SearchForm.component';
import Preloader from '../Preloader/Preloader.component';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Movies.styles.css';

const Movies = ({
  movieList,
  isLoaded,
  isShortMovies,
  onSearch,
  onFilterCheckbox,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = () => {};

  const handleCheckbox = () => {
    onFilterCheckbox();
  };

  useEffect(() => {
    onFilterCheckbox();
  }, [currentUser]);

  return (
    <main className='movies'>
      <SearchForm
        isShortMovies={isShortMovies}
        onSearch={onSearch}
        onFilterCheckbox={onFilterCheckbox}
      />
      {isLoaded ? <MoviesCardList movieList={movieList} /> : <Preloader />}
    </main>
  );
};

export default Movies;
