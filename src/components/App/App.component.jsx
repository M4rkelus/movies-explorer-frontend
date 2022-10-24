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

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import mainApi from '../../utils/MainApi';

import './App.styles.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Navbar menu button state

  const [userMovieList, setUserMovieList] = useState([]); // Movies saved by user
  const [updatedUserMovieList, setUpdatedUserMovieList] = useState([]); // For trigger RErender component after remove bookmark

  const [currentUser, setCurrentUser] = useState({}); // User data state

  const headerRoutesArr = ['/', '/movies', '/saved-movies', '/profile']; // Path routes for header view
  const footerRoutesArr = ['/', '/movies', '/saved-movies']; // Path routes for footer view

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleAccordionBtnClick = () => setIsAccordionOpen(!isAccordionOpen);
  const handleNotFoundBtnClick = () => navigate('/');
  const handleElementRouteCheck = (routesArr) =>
    routesArr.some((route) => route === currentLocation.pathname);

  const handleRegisterSubmit = (name, email, password) =>
    mainApi
      .register(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => {
        console.error(`Некорректно заполнено одно из полей: (${err})`);
      });

  const handleLoginSubmit = (email, password) =>
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.error(`Пользователь с email не найден : (${err})`);
      });

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/signin');
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
          .catch((err) => console.log(err)); // TODO
  };

  const handleDeleteMovie = (movie) => {
    const savedUserMovie = userMovieList.find(
      (userMovie) =>
        userMovie.movieId === movie.id || userMovie.movieId === movie.movieId
    );
    mainApi.deleteMovie(savedUserMovie._id).then(() => {
      const newUserMovieList = userMovieList.filter(
        (userMovie) => userMovie.movieId !== movie.movieId
      );

      setUserMovieList(newUserMovieList);
      setUpdatedUserMovieList(userMovieList);
      localStorage.setItem(
        `${currentUser.email} - userMovies`,
        JSON.stringify(newUserMovieList)
      );
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt)
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          navigate('/movies');
        })
        .catch((err) => console.error(`Токен не соответствует: (${err})`));
  }, []);

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
          setUserMovieList(movies.filter((m) => m.owner === currentUser._id));
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
                element={<Profile onSignOut={handleSignOut} />}
              />
            </Route>
            <Route exact path='/' element={<Main />} />
            <Route
              exact
              path='/signup'
              element={<Register onRegister={handleRegisterSubmit} />}
            />
            <Route
              exact
              path='/signin'
              element={<Login onLogin={handleLoginSubmit} />}
            />
            <Route
              path='/404'
              element={<NotFound onGoBackBtnClick={handleNotFoundBtnClick} />}
            />
            <Route path='*' element={<Navigate to='/404' replace />} />
          </Routes>
          {handleElementRouteCheck(footerRoutesArr) && <Footer />}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
