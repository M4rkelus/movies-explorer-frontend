import MoviesCardList from '../MoviesCardList/MoviesCardList.component';
import SearchForm from '../SearchForm/SearchForm.component';

import './Movies.styles.css';

const Movies = (movieList) => {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movieList={movieList} />
    </main>
  );
};

export default Movies;
