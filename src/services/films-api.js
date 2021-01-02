const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'af6a87365963f0e1cfa96cb09744561b';

async function apiService(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('404 Not found'));
}

export function getTrendingFilms() {
  return apiService(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function getFilmsBySearchQuery(query) {
  return apiService(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`,
  );
}

export function getFullFilmInfo(filmId) {
  return apiService(`${BASE_URL}/movie/${filmId}?api_key=${API_KEY}`);
}

export function getMovieCredits(filmId) {
  return apiService(`${BASE_URL}/movie/${filmId}/credits?api_key=${API_KEY}`);
}

export function getMovieReviews(filmId) {
  return apiService(`${BASE_URL}/movie/${filmId}/reviews?api_key=${API_KEY}`);
}
// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = '6914e86918040074e2fe382ba8e8cb5e';

// async function apiService(url = '', config = {}) {
//   const response = await fetch(url, config);
//   return response.ok
//     ? await response.json()
//     : Promise.reject(
//         new Error('404 The resource you requested could not be found 🥺'),
//       );
// }

// export function getTrending() {
//   return apiService(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
// }

// export function searchMovies(query, page) {
//   return apiService(
//     `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
//   );
// }

// export function getMovieDetails(movieId) {
//   return apiService(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
// }

// export function getMovieCredits(movieId) {
//   return apiService(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
// }

// export function getMovieReviews(movieId, page) {
//   return apiService(
//     `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=${page}`,
//   );
// }
