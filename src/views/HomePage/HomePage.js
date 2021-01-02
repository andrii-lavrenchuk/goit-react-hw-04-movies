import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as apiService from '../../services/films-api';

export default function HomePage() {
  const { url } = useRouteMatch();

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    // setStatus(Status.PENDING);
    apiService
      .getTrendingFilms()
      .then(({ results }) => {
        setMovies(results);
        // setTotalPage(total_pages);
        // setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        // setError('Something went wrong. Try again.');
        // setStatus(Status.REJECTED);
      });
  }, []);

  return (
    <>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
