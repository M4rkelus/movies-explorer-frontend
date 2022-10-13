import './NotFound.styles.css';

const NotFound = ({ onGoBackBtnClick }) => {
  return (
    <main className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__title'>404</h1>
        <h2 className='not-found__subtitle'>Страница не найдена</h2>
      </div>
      <button className='not-found__button' onClick={onGoBackBtnClick}>
        Назад
      </button>
    </main>
  );
};

export default NotFound;