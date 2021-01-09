import ShowMore from 'react-simple-show-more';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import s from './Reviews.module.css';

import * as apiService from '../../services/films-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    apiService.getMovieReviews(movieId).then(({ results }) => {
      if (results.length === 0) {
        toast.error('There are no reviews for this movie ');
        return;
      }
      setReviews(results);
    });
  }, [movieId]);

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id} className={s.review}>
          <h2 className={s.reviewAuthor}>Author: {review.author}</h2>
          <p className={s.reviewContent}>
            <ShowMore
              text={review.content}
              length={170}
              showMoreLabel="Show more"
              showLessLabel="Show less"
              style={{
                cursor: 'pointer',
                color: 'green',
                fontWeight: 'bold',
              }}
            />
          </p>
        </li>
      ))}
    </ul>
  );
}
