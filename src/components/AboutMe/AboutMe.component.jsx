import avatarPicture from '../../images/avatar-picture.jpg';

import './AboutMe.styles.css';

const AboutMe = () => {
  return (
    <section className='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__bio-container'>
          <div className='about-me__bio'>
            <h3 className='about-me__name'>Марк</h3>
            <p className='about-me__age'>Фронтенд-разработчик, 33 года</p>
            <p className='about-me__text'>
              Я&nbsp;родился в&nbsp;Мариуполе. В&nbsp;2020 женился
              и&nbsp;переехал в&nbsp;Россию, cейчас живу
              в&nbsp;Санкт-Петербурге. Люблю музыку, особенно alt.rock!
              Увлекаюсь ездой на&nbsp;велосипеде. Недавно начал кодить. Прошёл
              курс по&nbsp;веб-разработке и&nbsp;хочу связать дальнейшую карьеру
              с&nbsp;кодом
            </p>
            <ul className='about-me__socials'>
              <li>
                <a
                  className='about-me__social-link'
                  href='https://github.com/M4rkelus'
                  target='_blank'
                  rel='noreferrer'
                  title='GitHub'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className='about-me__social-link'
                  href='https://vk.com/mark0000001'
                  target='_blank'
                  rel='noreferrer'
                  title='ВКонтакте'
                >
                  ВКонтакте
                </a>
              </li>
              <li>
                <a
                  className='about-me__social-link'
                  href='https://www.linkedin.com/in/markpirogov/'
                  target='_blank'
                  rel='noreferrer'
                  title='LinkedIn'
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <img
            className='about-me__avatar'
            src={avatarPicture}
            alt='Пирогов Марк'
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
