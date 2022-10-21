import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard.component';

import './MoviesCardList.styles.css';

const MoviesCardList = ({ movieList }) => {
  const [loadMore, setLoadMore] = useState(false); // TODO  Sliced array and add 12 cards by click
  const currentLocation = useLocation();

  const handleClick = () => {
    setLoadMore(true);
  }; // TODO move to App component

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {movieList?.slice(0, 12).map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}

        {loadMore &&
          movieList
            ?.slice(12)
            .map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
      </ul>
      {currentLocation.pathname === '/movies' &&
        movieList.length >= 12 && ( // TODO Add condition to hide LoadMore button when all list shown
          <button
            className='movies-card-list__load-more'
            onClick={handleClick} // TODO temp onClick and handle DELETE
          >
            Ещё
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;
