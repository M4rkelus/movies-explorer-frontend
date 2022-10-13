import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.styles.css';

const MoviesCard = ({ movie }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const currentLocation = useLocation();

  // Temp TODO move to utils file
  const toHoursAndMinutes = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    if (hours === 0) return `${padTo2Digits(minutes)}м`;
    if (minutes === 0) return `${hours}ч`;

    return `${hours}ч ${padTo2Digits(minutes)}м`;
  };
  const padTo2Digits = (num) => num.toString().padStart(2, '0');

  const handleBookmarkClick = () => setIsBookmarked(!isBookmarked);
  const handleDeleteClick = () => setIsBookmarked(false);

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
            src={`https://api.nomoreparties.co${movie.image.url}`} // TODO fix url
            alt={movie.nameRU}
          />
        </a>
      </article>
    </li>
  );
};

export default MoviesCard;
