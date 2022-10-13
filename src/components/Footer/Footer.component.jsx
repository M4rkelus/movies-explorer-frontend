import './Footer.styles.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <h2 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className='footer__navigation'>
          <p className='footer__copyright'>&copy; 2022</p>
          <ul className='footer__links-list'>
            <li>
              <a
                className='footer__link'
                href='https://practicum.yandex.ru/'
                target='_blank'
                rel='noreferrer'
                title='Яндекс Практикум'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className='footer__link'
                href='https://github.com/M4rkelus'
                target='_blank'
                rel='noreferrer'
                title='GitHub'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
