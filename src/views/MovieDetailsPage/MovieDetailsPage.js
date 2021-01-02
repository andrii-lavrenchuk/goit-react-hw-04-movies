import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../../services/films-api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

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
            </div>
          </div>
        </>
      )}
    </>
  );
}
