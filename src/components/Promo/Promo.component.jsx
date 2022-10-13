import landingLogo from '../../images/landing-logo.svg';
import './Promo.styles.css';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__about-project'>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className='promo__description'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a
            className='promo__learn-more-link'
            href='https://practicum.yandex.ru/web/'
            target='_blank'
            rel='noreferrer'
            title='Курс Веб‑разработчик'
          >
            Узнать больше
          </a>
        </div>
        <img
          src={landingLogo}
          alt='логотип Всемирная паутина'
          className='promo__logo'
        />
      </div>
    </section>
  );
};

export default Promo;
