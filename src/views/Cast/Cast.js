import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

    <ul>
      {casts &&
        casts.map(cast => (
          <li key={cast.id}>
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                  : 'noImageFound'
              }
              alt={cast.name}
            />
            <h2>{cast.name}</h2>
            <p>{cast.character}</p>
          </li>
        ))}
      {/* {casts.map(cast => {
        <li key={cast.id}>
          <img
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                : 'noImageFound'
            }
          />
          <h2>{cast.name}</h2>
          <p>{cast.character}</p>
        </li>;
      })} */}
    </ul>
  );
}
