import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as apiService from '../../services/films-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    apiService.getMovieReviews(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);

  // console.log(reviews);

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h2>Author: {review.author}</h2>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
