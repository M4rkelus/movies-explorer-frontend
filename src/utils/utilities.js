import { SHORT_MOVIE_DURATION } from "./constants";

// Convert  minutes to full hours and minutes
export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours === 0) return `${padTo2Digits(minutes)}м`;
  if (minutes === 0) return `${hours}ч`;

  return `${hours}ч ${padTo2Digits(minutes)}м`;
};

// Pad to two digits number
export const padTo2Digits = (num) => num.toString().padStart(2, '0');

// Filter movies by "short movies" duration
export const filterShortMovies = (moviesArr) => moviesArr.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);

// Filter movies by user search
export const filterMoviesSearch = (moviesArr, searchQuery, isShortMoviesCheckbox) => {
  const filtredMoviesArr = moviesArr.filter((movie) => {
    return String(movie.nameRU)
      .toLowerCase()
      .trim()
      .indexOf(searchQuery.toLowerCase().trim()) !== -1
      || String(movie.nameEN)
        .toLowerCase()
        .trim()
        .indexOf(searchQuery.toLowerCase().trim()) !== -1
  });

  return isShortMoviesCheckbox ? filterShortMovies(filtredMoviesArr) : filtredMoviesArr;
}

// Match bookmarked movies with cards
export const findBookmarkedMovies = (userMoviesArr, movie) => userMoviesArr.find((item) => item.movieId === movie.id);

// Add missing api movie data and tramsform image links
export const transformMoviesData = (moviesArr) => {
  moviesArr.forEach(movie => {
    if (!movie.nameEN) movie.nameEN = movie.nameRU;
    if (!movie.country) movie.country = 'Russia';
    if (!movie.trailerLink || !movie.trailerLink.includes('https://www.youtube.com/'))
      movie.trailerLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    if (!movie.image) {
      movie.image = 'https://s1.hostingkartinok.com/uploads/images/2022/10/f27b6ff74390f86b5c5d4f222436d605.jpg'
      movie.thumbnail = 'https://s1.hostingkartinok.com/uploads/images/2022/10/f27b6ff74390f86b5c5d4f222436d605.jpg'
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }
  })
  return moviesArr;
}
