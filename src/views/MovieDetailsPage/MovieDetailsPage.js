import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
} from 'react-router-dom';
// import errorImg from './error.jpg';
import * as apiService from '../../services/films-api';
// import s from '../../Components/Navigation/Navigation.module.css';
import s from './MovieDetailsPage.module.css';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    apiService
      .getFullFilmInfo(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovie({
          src: poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : `{noImageFound}`,
          title: original_title,
          score: popularity.toFixed(1),
          overview,
          genres,
        });
      });
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <div className={s.wrapper}>
            <img className={s.poster} src={movie.src} alt={movie.title} />
            <div className={s.description}>
              <h2 className={s.movieTitle}>{movie.title}</h2>
              <h3 className={s.movieScore}>User Score</h3>
              <p>{movie.score}</p>
              <h3 className={s.movieOverview}>Overview</h3>
              <p>{movie.overview}</p>
              <h3 className={s.movieGenres}>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <nav className={s.linkNav}>
            <NavLink
              to={`${url}/cast`}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Cast
            </NavLink>
            <NavLink
              to={`${url}/reviews`}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Reviews
            </NavLink>
          </nav>
          <Switch>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>

            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
