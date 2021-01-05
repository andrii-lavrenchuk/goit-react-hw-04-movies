import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as apiService from '../../services/films-api';
import s from './HomePage.module.css';

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
      <ul className={s.movieGallery}>
        {movies &&
          movies.map(movie => (
            <li key={movie.id} className={s.movieGalleryItem}>
              <Link to={`${url}movies/${movie.id}`}>
                <img
                  className={s.movieGalleryItemImage}
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
  );
}
