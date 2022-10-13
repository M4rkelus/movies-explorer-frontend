import { Link, useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation.component';
import logo from '../../images/logo.svg';

import './Header.styles.css';

const Header = ({ isLoggedIn, isAccordionOpen, onClickAccordion }) => {
  const currentLocation = useLocation();

  return (
    <header
      className={`header header_theme_${
        currentLocation.pathname === '/' ? 'landing' : 'main'
      }`}
    >
      <div className='header__container'>
        <Link to='/' className='header__logo-link'>
          <img src={logo} alt='Лого' />
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          isAccordionOpen={isAccordionOpen}
          onClickAccordion={onClickAccordion}
        />
      </div>
    </header>
  );
};

export default Header;
