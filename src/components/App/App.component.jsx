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
import { filterMoviesSearch, filterShortMovies } from '../../utils/utilities';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import './App.styles.css';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(true); // TODO false
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO false
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [movieList, setMovieList] = useState([]);
  const [userMovieList, setUserMovieList] = useState([]);
  const [filtredMovieList, setFiltredMovieList] = useState([]);

  const headerRoutesArr = ['/', '/movies', '/saved-movies', '/profile'];
  const footerRoutesArr = ['/', '/movies', '/saved-movies'];

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

  const handleSearchSubmit = (inputValue) => {
    if (movieList.length === 0) {
      setIsLoaded(false);
      moviesApi
        .getMovies()
        .then((movies) => {
          const filtredMoviesArr = filterMoviesSearch(
            movieList,
            inputValue,
            isShortMovies
          );
          setMovieList(movies);
          setFiltredMovieList(filtredMoviesArr);
          localStorage.setItem(
            `${currentUser.email} - movies`,
            JSON.stringify(filtredMoviesArr)
          );
        })
        .catch((err) => console.log(err))
        .finally(setIsLoaded(true));
    } else {
      filterMoviesSearch(movieList, inputValue, isShortMovies);
    }
  };

  useEffect(() => {
    console.log('из юз эффекта', movieList);
    console.log('filtredList из юз эффекта', filtredMovieList);
  }, [movieList, filtredMovieList]);

  // Set state of 'short movies checkbox' and put it in local storage
  const handleShortMoviesCheckbox = () => {
    setIsShortMovies(!isShortMovies);
    !isShortMovies
      ? setFiltredMovieList(filterShortMovies(movieList))
      : setFiltredMovieList(movieList);
    localStorage.setItem(
      `${currentUser.email} - isShortMovies`,
      !isShortMovies
    );
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          navigate('/movies');
        })
        .catch((err) => console.error(`Токен не соответствует: (${err})`));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserData()
        .then((user) => setCurrentUser(user.data))
        .catch((err) => console.error(`Что-то пошло не так: (${err})`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      mainApi
        .getUserMovies()
        .then((movies) => {
          setUserMovieList(movies.filter((m) => m.owner === currentUser._id));
        })
        .catch((err) => console.error(`Что-то пошло не так: (${err})`));
    }
  }, [isLoggedIn, currentUser]);

  // Check 'short movies checkbox' state in local storage
  useEffect(() => {
    localStorage.getItem(`${currentUser.email} - isShortMovies`) === 'true'
      ? setIsShortMovies(true)
      : setIsShortMovies(false);
  }, [currentUser]);

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
                    movieList={movieList}
                    isLoaded={isLoaded}
                    isShortMovies={isShortMovies}
                    onSearch={handleSearchSubmit}
                    onFilterCheckbox={handleShortMoviesCheckbox}
                  />
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <SavedMovies
                    movies={userMovieList}
                    isLoaded={isLoaded}
                    isShortMovies={isShortMovies}
                    onSearch={handleSearchSubmit}
                    onFilterCheckbox={handleShortMoviesCheckbox}
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
