import MoviesCardList from '../MoviesCardList/MoviesCardList.component';
import SearchForm from '../SearchForm/SearchForm.component';

import './SavedMovies.styles.css';

const SavedMovies = (movieList) => {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movieList={movieList} />
    </main>
  );
};

export default SavedMovies;
