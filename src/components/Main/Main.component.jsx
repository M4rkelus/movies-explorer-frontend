import Promo from '../Promo/Promo.component';
import AboutProject from '../AboutProject/AboutProject.component';
import Techs from '../Techs/Techs.component';
import AboutMe from '../AboutMe/AboutMe.component';
import Portfolio from '../Portfolio/Portfolio.component';

import './Main.styles.css';

const Main = () => {
  return (
    <main className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
};

export default Main;
