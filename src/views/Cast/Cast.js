import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import errorImg from './error.jpg';
import s from './Cast.module.css';
import * as apiService from '../../services/films-api';

export default function Cast() {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);

  useEffect(() => {
    apiService.getMovieCredits(movieId).then(({ cast }) => {
      setCast(cast);
    });
  }, [movieId]);

  return (
    // <p>Cast</p>

    <ul className={s.cast}>
      {casts &&
        casts.map(cast => (
          <li key={cast.id} className={s.item}>
            <img
              className={s.photo}
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                  : 'noImageFound'
              }
              alt={cast.name}
            />
            <h2 className={s.name}>{cast.name}</h2>
            <p className={s.character}>{cast.character}</p>
          </li>
        ))}
    </ul>
  );
}
