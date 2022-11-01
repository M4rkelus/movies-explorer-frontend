import { MOVIE_API_URL } from './constants'

class MoviesApi {
  constructor(options) {
    this._options = options;
  }

  _getResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getMovies() {
    return fetch(`${this._options.MOVIE_API_URL}`, {
      headers: this._options.headers,
    }).then(this._getResponse);
  }
}

const moviesApi = new MoviesApi({
  MOVIE_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default moviesApi;