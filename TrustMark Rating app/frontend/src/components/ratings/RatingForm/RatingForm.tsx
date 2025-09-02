import React, { useState } from 'react';
import { ratingsService } from '../../../services/ratings.service';
import RatingStars from '../../common/RatingStars/RatingStars';
import './RatingForm.css';

interface RatingFormProps {
  store: any;
  onClose: () => void;
  onSubmit: () => void;
  existingRating?: any;
}

const RatingForm: React.FC<RatingFormProps> = ({ 
  store, 
  onClose, 
  onSubmit,
  existingRating 
}) => {
  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [comment, setComment] = useState(existingRating?.comment || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (existingRating) {
        await ratingsService.updateRating(existingRating.id, { rating, comment });
      } else {
        await ratingsService.createRating({
          storeId: store.id,
          rating,
          comment
        });
      }
      
      onSubmit();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-form-overlay">
      <div className="rating-form-modal">
        <div className="rating-form-header">
          <h2>Rate {store.name}</h2>
          <button className="close-btn" onClick={onClose}>Ã—</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">Your Rating</label>
            <RatingStars 
              rating={rating} 
              onChange={setRating}
              editable={true}
              size="large"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="comment" className="form-label">Comment (optional)</label>
            <textarea
              id="comment"
              className="form-input"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this store..."
            />
          </div>
          
          <div className="rating-form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading || rating === 0}
            >
              {loading ? 'Submitting...' : existingRating ? 'Update Rating' : 'Submit Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;


