import { BASE_URL } from "./constants";

class MainApi {
  constructor(options) {
    this._options = options;
  }

  _getResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  // Create new user
  register(name, email, password) {
    return fetch(`${this._options.BASE_URL}/signup`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    }).then(this._getResponse);
  }

  // Signin
  login(email, password) {
    return fetch(`${this._options.BASE_URL}/signin`, {
      method: "POST",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then(this._getResponse);
  }

  // Signout
  logout() {
    return fetch(`${this._options.BASE_URL}/signout`, {
      method: 'GET',
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._getResponse);
  }

  // Token check
  checkToken(token) {
    return fetch(`${this._options.BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._options.headers,
        "Authorization": `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(this._getResponse);
  }

  // Get user data
  getUserData() {
    return fetch(`${this._options.BASE_URL}/users/me`, {
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._getResponse);
  }

  // Update user data
  patchUser(name, email) {
    return fetch(`${this._options.BASE_URL}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ name, email }),
      credentials: 'include',
    }).then(this._getResponse);
  }

  // Get movies from bookmarks
  getUserMovies() {
    return fetch(`${this._options.BASE_URL}/movies`, {
      method: 'GET',
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._getResponse);
  }

  // Bookmark movie
  addMovie(movie) {
    return fetch(`${this._options.BASE_URL}/movies`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
      credentials: 'include',
    }).then(this._getResponse);
  }

  // Remove movie from bookmarks
  deleteMovie(movieId) {
    return fetch(`${this._options.BASE_URL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._getResponse);
  }
}

const mainApi = new MainApi({
  BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
})

export default mainApi;


