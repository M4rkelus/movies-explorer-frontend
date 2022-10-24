import { useState, useContext, useEffect } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList.component';
import SearchForm from '../SearchForm/SearchForm.component';
import Preloader from '../Preloader/Preloader.component';
import ErrorMessage from '../ErrorMessage/ErrorMessage.component';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { filterMoviesSearch, filterShortMovies } from '../../utils/utilities';
import { ERROR_MESSAGES } from '../../utils/constants';

import './SavedMovies.styles.css';

const SavedMovies = ({ userMovieList, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false); // Preloader show state
  const [isShortMovies, setIsShortMovies] = useState(false); // Short movies checkbox state
  const [isErrorMessage, setIsErrorMessage] = useState({
    isShown: false,
    message: '',
  });

  const [localMovieList, setLocalMovieList] = useState(userMovieList); // Saved in localStorage movie list
  const [filtredMovieList, setFiltredMovieList] = useState(localMovieList); // Filtred movies to render

  const currentUser = useContext(CurrentUserContext);

  // Search submit from user request
  const handleSearchSubmit = (inputValue) => {
    setIsErrorMessage({ isShown: false, message: '' });
    setIsLoading(true);

    const moviesToRender = filterMoviesSearch(
      userMovieList,
      inputValue,
      isShortMovies
    );

    if (moviesToRender.length === 0) {
      setIsErrorMessage({ isShown: true, message: ERROR_MESSAGES.NOT_FOUND });
    } else {
      setIsErrorMessage({ isShown: false, ErrorMessage: '' });
      setFiltredMovieList(moviesToRender);
      setLocalMovieList(moviesToRender);
    }
    setIsLoading(false);
  };

  // Set state of 'short movies checkbox' and put it in local storage
  const handleShortMoviesCheckbox = () => {
    setIsShortMovies(!isShortMovies);
    !isShortMovies
      ? setFiltredMovieList(filterShortMovies(localMovieList))
      : setFiltredMovieList(localMovieList);
    localStorage.setItem(
      `${currentUser.email} - isShortMovies`,
      !isShortMovies
    );
  };

  // Check 'short movies checkbox' state in local storage
  useEffect(() => {
    localStorage.getItem(`${currentUser.email} - isShortMovies`) === 'true'
      ? setIsShortMovies(true)
      : setIsShortMovies(false);
  }, [currentUser]);

  // Get movies from loacalStorage
  useEffect(() => {
    setFiltredMovieList(userMovieList);
    userMovieList.length === 0
      ? setIsErrorMessage({
          isShown: true,
          message: ERROR_MESSAGES.NOT_FOUND,
        })
      : setIsErrorMessage({
          isShown: false,
          message: '',
        });
  }, [userMovieList]);

  return (
    <main className='movies'>
      <SearchForm
        isShortMovies={isShortMovies}
        onSearch={handleSearchSubmit}
        onFilterCheckbox={handleShortMoviesCheckbox}
      />
      {isLoading ? (
        <Preloader />
      ) : !isErrorMessage.isShown ? (
        <MoviesCardList
          filtredMovieList={filtredMovieList}
          userMovieList={userMovieList}
          onDelete={onDelete}
        />
      ) : (
        <ErrorMessage message={isErrorMessage.message} />
      )}
    </main>
  );
};

export default SavedMovies;
