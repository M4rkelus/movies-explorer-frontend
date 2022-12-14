import { useLocation } from 'react-router-dom';
import { toHoursAndMinutes } from '../../utils/utilities';

import './MoviesCard.styles.css';

const MoviesCard = ({ movie, isBookmarked, onBookmark, onDelete }) => {
  const currentLocation = useLocation();

  const handleBookmarkClick = () => onBookmark(movie);
  const handleDeleteClick = () => onDelete(movie);

  return (
    <li className='movies-card'>
      <article className='movies-card__item'>
        <div className='movies-card__description'>
          <div className='movies-card__header'>
            <h2 className='movies-card__title'>{movie.nameRU}</h2>
            <span className='movies-card__duration'>
              {toHoursAndMinutes(movie.duration)}
            </span>
          </div>
          {currentLocation.pathname === '/movies' && (
            <button
              className={`movies-card__button movies-card__button_type_${
                isBookmarked ? 'saved' : 'save'
              }`}
              type='button'
              title={`${
                isBookmarked ? 'Убрать из избранного' : 'Добавить в избранное'
              }`}
              onClick={isBookmarked ? handleDeleteClick : handleBookmarkClick}
            ></button>
          )}
          {currentLocation.pathname === '/saved-movies' && (
            <button
              className='movies-card__button movies-card__button_type_delete'
              type='button'
              title='Удалить из сохранённых'
              onClick={handleDeleteClick}
            ></button>
          )}
        </div>
        <a
          className='movies-card__trailer-link'
          target='_blank'
          rel='noreferrer'
          href={movie.trailerLink}
        >
          <img
            className='movies-card__poster'
            src={movie.image}
            alt={movie.nameRU}
          />
        </a>
      </article>
    </li>
  );
};

export default MoviesCard;
