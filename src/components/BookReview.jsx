import { useState, useEffect } from 'react';

export default function BookReview({ book, onReviewsChange }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(book.reviews || []);

  useEffect(() => {
    onReviewsChange && onReviewsChange(reviews);
  }, [reviews]);

  useEffect(() => {
    setReviews(book.reviews || []);
  }, [book.reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert('Please select a rating.');
    if (!comment.trim()) return alert('Please write a comment.');

    const newReview = {
      id: Date.now(),
      rating,
      comment: comment.trim(),
    };

    setReviews(prev => [...prev, newReview]);
    setRating(0);
    setComment('');
  };

  const Star = ({ index }) => (
    <span
      style={{
        cursor: 'pointer',
        color: index <= rating ? '#ffc107' : '#e4e5e9',
        fontSize: '24px',
        marginRight: '5px',
      }}
      onClick={() => setRating(index)}
    >
      ★
    </span>
  );

  return (
    <div
      style={{
        backgroundColor: '#a32d2d',
        borderRadius: '10px',
        padding: '15px',
        color: 'white',
        marginBottom: '20px',
      }}
    >
      <h3>{book.title}</h3>

      <div style={{ margin: '10px 0' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} index={star} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            borderRadius: '8px',
            padding: '8px',
            border: 'none',
            marginTop: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: '10px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Submit Review
        </button>
      </form>

      <div style={{ marginTop: '15px' }}>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: '#7e1b1b',
              marginTop: '10px',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    color: star <= review.rating ? '#ffc107' : '#e4e5e9',
                    fontSize: '16px',
                    marginRight: '2px',
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p style={{ marginTop: '5px' }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
