import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
} from 'react-router-dom';
import * as apiService from '../../services/films-api';
import s from '../../Components/Navigation/Navigation.module.css';
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
          <div>
            <img src={movie.src} alt={movie.title} />
            <div>
              <h2>{movie.title}</h2>
              <h3>User Score</h3>
              <p>{movie.score}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
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
            </div>
          </div>
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
