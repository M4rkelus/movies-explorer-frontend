import './Techs.styles.css';

const Techs = () => {
  return (
    <section className='techs'>
      <div className='techs__container'>
        <h2 className='techs__title'>Технологии</h2>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <p className='techs__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__stack-list'>
          <li className='techs__stack-item'>
            <p className='techs__technology-name'>HTML</p>
          </li>
          <li className='techs__stack-item'>
            <p className='techs__technology-name'>CSS</p>
          </li>
          <li className='techs__stack-item'>
            <p className='techs__technology-name'>JS</p>
          </li>
          <li className='techs__stack-item'>
            <p className='techs__technology-name'>React</p>
          </li>
          <li className='techs__stack-item'>
            <p className='techs__technology-name'>Git</p>
          </li>
          <li className='techs__stack-item'>
            <p className='techs__technology-name'>Express.js</p>
          </li>
          <li className='techs__stack-item'>
            <p className='techs__technology-name'>mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;
