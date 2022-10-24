/* APIs */
// export const BASE_URL = "https://api.movies-explorer-mrk.nomorepartiesxyz.ru"; //TODO
export const BASE_URL = "http://localhost:3000";
export const MOVIE_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const SHORT_MOVIE_DURATION = 40;
export const ERROR_MESSAGES = {
  NOT_AVAILABLE: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  NOT_FOUND: 'Ничего не найдено',
}
export const DEVICE_SCREEN_SETTINGS = {
  desktop: {
    minWidth: 998,
    cards: {
      total: 12,
      add: 3,
    },
  },
  tablet: {
    minWidth: 630,
    cards: {
      total: 8,
      add: 2,
    },
  },
  phone: {
    minWidth: 320,
    cards: {
      total: 5,
      add: 2,
    },
  },
}