import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import Header from '../Header/Header.component';
import Main from '../Main/Main.component';
import Footer from '../Footer/Footer.component';
import Movies from '../Movies/Movies.component';
import SavedMovies from '../SavedMovies/SavedMovies.component';
import Profile from '../Profile/Profile.component';
import Register from '../Register/Register.component';
import Login from '../Login/Login.component';
import NotFound from '../NotFound/NotFound.component';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes.component';
import InfoTooltip from '../InfoTooltip/InfoTootip.component';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TOOLTIP_MESSAGES } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

import './App.styles.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Navbar menu button state
  const [isInfoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSucceeded: '',
    message: '',
  }); // Info tooltip config state
  const [isSubmitting, setIsSubmitting] = useState(false); // Forms submitting state

  const [userMovieList, setUserMovieList] = useState([]); // Movies saved by user
  const [updatedUserMovieList, setUpdatedUserMovieList] = useState([]); // Triger render after delete bookmark
  const [currentUser, setCurrentUser] = useState({}); // User data state

  const headerRoutesArr = ['/', '/movies', '/saved-movies', '/profile']; // Path routes for header view
  const footerRoutesArr = ['/', '/movies', '/saved-movies']; // Path routes for footer view

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleGoBackClick = () => navigate('/');
  const handleAccordionBtnClick = () => setIsAccordionOpen(!isAccordionOpen);

  const handleInfoTooltipClose = () =>
    setInfoTooltip({ ...isInfoTooltip, isOpen: false });

  const handleElementRouteCheck = (routesArr) =>
    routesArr.some((route) => route === currentLocation.pathname);

  const handleRegisterSubmit = async ({ name, email, password }) => {
    setIsSubmitting(true);
    await mainApi
      .register(name, email, password)
      .then((userData) => {
        if (userData.email) {
          setInfoTooltip({
            isOpen: true,
            isSucceeded: true,
            message: TOOLTIP_MESSAGES.REGISTER,
          });
          handleLoginSubmit({ email, password });
        }
      })
      .catch((err) => {
        setInfoTooltip({
          isOpen: true,
          isSucceeded: false,
          message: TOOLTIP_MESSAGES.ERROR.REGISTER_ERROR,
        });
        console.error(`Некорректно заполнено одно из полей: (${err})`);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleLoginSubmit = async ({ email, password }) => {
    setIsSubmitting(true);
    await mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
        setInfoTooltip({
          isOpen: true,
          isSucceeded: true,
          message: TOOLTIP_MESSAGES.LOGIN,
        });
      })
      .catch((err) => {
        setInfoTooltip({
          isOpen: true,
          isSucceeded: false,
          message: TOOLTIP_MESSAGES.ERROR.LOGIN_ERROR,
        });
        console.error(`Пользователь с таким email не найден : (${err})`);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleSignOut = () =>
    mainApi
      .logout()
      .then(() => {
        localStorage.clear();
        setCurrentUser({});
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((err) => {
        setInfoTooltip({
          isOpen: true,
          isSucceeded: false,
          message: TOOLTIP_MESSAGES.ERROR.PROFILE_ERROR,
        });
        console.error(`'Что-то пошло не так! Попробуйте ещё раз.' ${err}`);
      });

  const handleProfileEdit = async ({ name, email }) => {
    setIsSubmitting(true);
    await mainApi
      .patchUser(name, email)
      .then((data) => {
        setCurrentUser(data);
        setInfoTooltip({
          isOpen: true,
          isSucceeded: true,
          message: TOOLTIP_MESSAGES.PROFILE,
        });
      })
      .catch((err) => {
        setInfoTooltip({
          isOpen: true,
          isSucceeded: false,
          message: TOOLTIP_MESSAGES.ERROR.PROFILE_ERROR,
        });
        console.error(`'Что-то пошло не так! Попробуйте ещё раз.' ${err}`);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleBookmarkMovie = (movie) => {
    const isSavedMovie = userMovieList.some(
      (userMovie) => userMovie.movieId === movie.movieId
    );

    isSavedMovie
      ? handleDeleteMovie(movie)
      : mainApi
          .addMovie(movie)
          .then((newMovie) => setUserMovieList([...userMovieList, newMovie]))
          .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (movie) => {
    const savedUserMovie = userMovieList.find(
      (userMovie) =>
        userMovie.movieId === movie.id || userMovie.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedUserMovie._id)
      .then(() => {
        const newUserMovieList = userMovieList.filter(
          (userMovie) => userMovie.movieId !== movie.movieId
        );

        setUserMovieList(newUserMovieList);
        setUpdatedUserMovieList(userMovieList);
        localStorage.setItem(
          `${currentUser.email} - userMovies`,
          JSON.stringify(newUserMovieList)
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          navigate(currentLocation.pathname);
        })
        .catch((err) => console.error(`Токен не соответствует: (${err})`));
    } else {
      handleSignOut();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn)
      mainApi
        .getUserData()
        .then((user) => setCurrentUser(user.data))
        .catch((err) => console.error(`Что-то пошло не так: (${err})`));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && currentUser)
      mainApi
        .getUserMovies()
        .then((movies) => {
          setUserMovieList(
            movies.filter((movie) => movie.owner === currentUser._id)
          );
        })
        .catch((err) => console.error(`Что-то пошло не так: (${err})`));
  }, [isLoggedIn, currentUser, updatedUserMovieList]);

  return (
    <div className='App'>
      <div className='page'>
        <CurrentUserContext.Provider value={currentUser}>
          {handleElementRouteCheck(headerRoutesArr) && (
            <Header
              isLoggedIn={isLoggedIn}
              isAccordionOpen={isAccordionOpen}
              onClickAccordion={handleAccordionBtnClick}
            />
          )}
          <Routes>
            <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
              <Route
                path='/movies'
                element={
                  <Movies
                    userMovieList={userMovieList}
                    onBookmark={handleBookmarkMovie}
                    onDelete={handleDeleteMovie}
                  />
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <SavedMovies
                    userMovieList={userMovieList}
                    onDelete={handleDeleteMovie}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <Profile
                    onSignOut={handleSignOut}
                    onSubmit={handleProfileEdit}
                    isSubmitting={isSubmitting}
                  />
                }
              />
            </Route>
            <Route exact path='/' element={<Main />} />
            <Route
              path='/signup'
              element={
                isLoggedIn ? (
                  <Navigate to='/' replace />
                ) : (
                  <Register
                    onRegister={handleRegisterSubmit}
                    isSubmitting={isSubmitting}
                  />
                )
              }
            />
            <Route
              path='/signin'
              element={
                isLoggedIn ? (
                  <Navigate to='/' replace />
                ) : (
                  <Login
                    onLogin={handleLoginSubmit}
                    isSubmitting={isSubmitting}
                  />
                )
              }
            />
            <Route
              path='/404'
              element={<NotFound onClick={handleGoBackClick} />}
            />
            <Route path='*' element={<Navigate to='/404' replace />} />
          </Routes>
          {handleElementRouteCheck(footerRoutesArr) && <Footer />}
          <InfoTooltip
            configState={isInfoTooltip}
            onClose={handleInfoTooltipClose}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
