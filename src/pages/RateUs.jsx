import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { postApiWithTokenRowData } from '../utils/api';
import { toastError, toastSuccess } from '../utils/notifyCustom';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewChange = (event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      setReview(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (rating === 0) {
      toastError('Please select a rating');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_RATING}`;
      const raw = {
        rating,
        messages: review
      };
      
      const response = await postApiWithTokenRowData(url, raw);
      
      if (response.data?.success) {
        toastSuccess(response.data.message);
        setRating(0);
        setReview('');
      } else {
        toastError(response.data?.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error occurred during form submission:', error);
      if (error.response) {
        toastError(error.response.data?.message || 'Failed to submit rating');
      } else {
        toastError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-10 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Rate Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center mb-4">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer"
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <p className="text-center text-gray-600">Your Rating: {rating} out of 5</p>
        <p className="text-center text-gray-600 mb-6">1,745 global ratings</p>
        {/* <div className="space-y-4">
          <RatingBar label="5 star" percentage={70} />
          <RatingBar label="4 star" percentage={17} />
          <RatingBar label="3 star" percentage={8} />
          <RatingBar label="2 star" percentage={4} />
          <RatingBar label="1 star" percentage={1} />
        </div> */}
        <div className="mt-6">
          <label htmlFor="review" className="block mb-2 text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            required
            className="w-full p-2 border border-gray-300 rounded h-32"
          />
          <p className="text-sm text-gray-500 mt-1">{150 - review.length} characters remaining</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

const RatingBar = ({ label, percentage }) => {
  return (
    <div className="flex items-center">
      <span className="w-16 text-sm font-medium text-blue-600">{label}</span>
      <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div className="h-5 bg-yellow-300 rounded" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{percentage}%</span>
    </div>
  );
};

export default RateUs;
