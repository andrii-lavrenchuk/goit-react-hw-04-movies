import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import slugify from 'slugify';

import Searchbar from '../../Components/Searchbar/Searchbar';
import * as apiService from '../../services/films-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const makeSlug = string => slugify(string, { lower: true });

  const { url } = useRouteMatch();

  useEffect(() => {
    if (!searchQuery) return;

    setStatus(Status.PENDING);

    apiService
      .getFilmsBySearchQuery(searchQuery)
      .then(({ results }) => {
        if (results.length === 0) {
          alert('hkjhkh');
          // setError(`No results were found for ${query}!`);
          setStatus(Status.REJECTED);
          return;
        }
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  const onChangeQuery = newQuery => {
    if (searchQuery === newQuery) {
      return;
    }
    setSearchQuery(newQuery);
    // setMovies(null);
    setError(null);
    setStatus(Status.IDLE);
  };

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />
      {status === Status.PENDING && <p>Waiting</p>}
      {status === Status.REJECTED && <p>Rejected</p>}
      {status === Status.RESOLVED && (
        <>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`${url}/${movie.id}`}>
                  <img
                    // className={s.movieGalleryItemImage}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : 'noImageFound'
                    }
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
