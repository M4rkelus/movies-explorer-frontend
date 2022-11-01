import './InfoTooltip.styles.css';

const InfoTooltip = ({
  onClose,
  configState: { isOpen, isSucceeded, message },
}) => {
  return (
    <div
      className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`}
      onClick={onClose}
    >
      <div className='info-tooltip__container'>
        <div
          className={`info-tooltip__img ${
            isSucceeded
              ? 'info-tooltip__img_success'
              : 'info-tooltip__img_failure'
          }`}
        ></div>
        <p className='info-tooltip__message'>{message}</p>
        <button
          onClick={onClose}
          className='info-tooltip__close-btn'
          type='button'
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
