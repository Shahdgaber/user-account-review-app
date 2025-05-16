// src/pages/ReviewPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewPage() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user')) || { name: 'Guest' };

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('books')) || [];

    const defaultBooks = [
      { id: 1, title: 'أرض زيكولا', author: 'عمرو عبد الحميد', price: '200 EGP', reviews: [] },
      { id: 2, title: 'وادي الذئاب المنسية', author: 'عمرو عبد الحميد', price: '200 EGP', reviews: [] },
      { id: 3, title: 'أماريتا', author: 'عمرو عبد الحميد', price: '200 EGP', reviews: [] },
      { id: 4, title: 'فتاة الياقة الزرقاء', author: 'عمرو عبد الحميد', price: '200 EGP', reviews: [] },
      { id: 5, title: 'قواعد جارتين', author: 'عمرو عبد الحميد', price: '200 EGP', reviews: [] },
    ];

    const mergedBooks = defaultBooks.map((defaultBook) => {
      const storedBook = stored.find((b) => b.title === defaultBook.title);
      return storedBook || defaultBook;
    });

    setBooks(mergedBooks);
    localStorage.setItem('books', JSON.stringify(mergedBooks));
  }, []);

  const addReview = (bookId, reviewText, rating) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          reviews: [
            ...book.reviews,
            {
              id: Date.now(),
              text: reviewText,
              rating,
              user: currentUser.name,
            },
          ],
        };
      }
      return book;
    });

    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const deleteReview = (bookId, reviewId) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          reviews: book.reviews.filter((review) => review.id !== reviewId),
        };
      }
      return book;
    });

    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#121212', // داكن جداً
        color: '#e0e0e0', // لون نص فاتح
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: '#1e1e1e', // خلفية البطاقة داكنة
          borderRadius: '12px',
          boxShadow: '0 0 15px rgba(0,0,0,0.8)',
          padding: '2rem',
          boxSizing: 'border-box',
          textAlign: 'center',
          border: '1px solid #333',
        }}
      >
        <h1 style={{ marginBottom: '2rem', color: '#90caf9' }}>Book Reviews</h1>

        {books.map((book) => (
          <div
            key={book.id}
            style={{
              backgroundColor: '#292929',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              textAlign: 'left',
              border: '1px solid #444',
            }}
          >
            <h3 style={{ margin: 0, color: '#bbdefb' }}>{book.title}</h3>
            <p style={{ margin: '4px 0', fontStyle: 'italic', color: '#aaa' }}>
              Author: {book.author} | Price: {book.price}
            </p>

            {book.reviews.length === 0 && (
              <p style={{ fontStyle: 'italic', color: '#666' }}>No reviews yet.</p>
            )}

            {book.reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#333',
                  borderRadius: '6px',
                  position: 'relative',
                  boxShadow: 'inset 0 0 5px #000000a0',
                }}
              >
                <p style={{ marginBottom: '0.25rem', color: '#ddd' }}>
                  {review.text || 'No review provided.'}
                </p>
                <div style={{ color: '#ffd700', fontSize: '1.2rem' }}>
                  {renderStars(review.rating)}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#bbb' }}>— {review.user}</p>
                <button
                  onClick={() => deleteReview(book.id, review.id)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: '#e53e3e',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    fontSize: '0.75rem',
                    boxShadow: '0 0 5px #e53e3e',
                  }}
                  title="Delete review"
                >
                  ×
                </button>
              </div>
            ))}

            <AddReviewForm bookId={book.id} onAddReview={addReview} />
          </div>
        ))}

        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '1rem',
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(25, 118, 210, 0.5)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1565c0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}

function AddReviewForm({ bookId, onAddReview }) {
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(0);

  const submit = () => {
    if (!text.trim()) return alert('Enter review text');
    if (rating === 0) return alert('Select rating');
    onAddReview(bookId, text.trim(), rating);
    setText('');
    setRating(0);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <textarea
        placeholder="Add your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          borderRadius: '6px',
          border: '1px solid #555',
          backgroundColor: '#222',
          color: '#eee',
          resize: 'vertical',
          fontFamily: 'inherit',
          fontSize: '1rem',
        }}
      />
      <div style={{ marginBottom: '0.5rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              fontSize: '1.5rem',
              color: star <= rating ? '#ffd700' : '#555',
              cursor: 'pointer',
              userSelect: 'none',
              marginRight: '5px',
              transition: 'color 0.2s ease',
            }}
            title={`${star} Star${star > 1 ? 's' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      <button
        onClick={submit}
        style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '0.5rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 3px 6px rgba(25, 118, 210, 0.5)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1565c0')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
      >
        Add Review
      </button>
    </div>
  );
}
