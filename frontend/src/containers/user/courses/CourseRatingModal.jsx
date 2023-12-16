

import React, { useState } from 'react';
import Modal from 'react-modal';
import StarRating from './StarRating'; // Replace with your actual StarRating component



const CourseRatingModal = ({ isOpen, onClose, onSubmit }) => {
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleReviewChange = (event) => {
    setUserReview(event.target.value);
  };

  const handleSubmit = () => {
    // Call the onSubmit callback with the selected user rating and review
    onSubmit({ rating: userRating, review: userReview });
  };

  return (
    <div
      className={`modal ${isOpen ? 'modal-open' : 'modal-closed'}`}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
      }}
    >
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Course Rating Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div>
          <h2>Rate This Course</h2>
          <StarRating rating={userRating} onRatingChange={handleRatingChange} />

          <label htmlFor="review">Write a Review:</label>
          <textarea
            id="review"
            value={userReview}
            onChange={handleReviewChange}
            rows={4}
            cols={50}
          />

          <button onClick={handleSubmit}>Submit Rating and Review</button>
          <button onClick={onClose}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default CourseRatingModal;

