import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes.component';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../Header/Header.component';
import Main from '../Main/Main.component';
import Footer from '../Footer/Footer.component';
import Preloader from '../Preloader/Preloader.component';
import Movies from '../Movies/Movies.component';
import SavedMovies from '../SavedMovies/SavedMovies.component';
import Profile from '../Profile/Profile.component';
import Register from '../Register/Register.component';
import Login from '../Login/Login.component';
import NotFound from '../NotFound/NotFound.component';

import './App.styles.css';

import MoviesApi from '../../utils/MoviesApi';

const App = () => {
  const [isloaded, setIsLoaded] = useState(true); // TODO false
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO false
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // TODO false

  const [currentUser, setCurrentUser] = useState({
    // TODO {}
    name: 'Марк',
    email: 'test@mail.ru',
  });

  const [movieList, setMovieList] = useState([]);

  const headerRoutesArr = ['/', '/movies', '/saved-movies', '/profile'];
  const footerRoutesArr = ['/', '/movies', '/saved-movies'];

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleAccordionBtnClick = () => setIsAccordionOpen(!isAccordionOpen);
  const handleNotFoundBtnClick = () => navigate('/');
  const handleElementRouteCheck = (routesArr) =>
    routesArr.some((route) => route === currentLocation.pathname);

  // Temp for get movies
  useEffect(() => {
    MoviesApi.getMovies().then((movies) => setMovieList(movies));
  }, []);

  return (
    <div className='App'>
      <div className='page'>
        {isloaded ? (
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
                <Route path='/movies' element={<Movies movies={movieList} />} />
                {/* TODO saved movie list state var*/}
                <Route
                  path='/saved-movies'
                  element={<SavedMovies movies={movieList} />}
                />
                <Route path='/profile' element={<Profile />} />
              </Route>
              <Route exact path='/' element={<Main />} />
              <Route exact path='/signup' element={<Register />} />
              <Route exact path='/signin' element={<Login />} />
              <Route
                path='/404'
                element={<NotFound onGoBackBtnClick={handleNotFoundBtnClick} />}
              />
              <Route path='*' element={<Navigate to='/404' replace />} />
            </Routes>
            {handleElementRouteCheck(footerRoutesArr) && <Footer />}
          </CurrentUserContext.Provider>
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
};

export default App;
