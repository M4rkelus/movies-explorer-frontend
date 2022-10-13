// TODO rest methods

class MoviesApi {
  _getResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(this._getResponse);
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;