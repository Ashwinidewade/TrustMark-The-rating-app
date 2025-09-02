import React from 'react';
import './RatingStars.css';

interface RatingStarsProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
  onChange?: (rating: number) => void;
  editable?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'medium', 
  onChange, 
  editable = false 
}) => {
  const handleClick = (newRating: number) => {
    if (editable && onChange) {
      onChange(newRating);
    }
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= rating ? 'filled' : ''} ${size} ${editable ? 'editable' : ''}`}
        onClick={() => handleClick(i)}
      >
        â˜…
      </span>
    );
  }

  return (
    <div className="rating-stars-container">
      {stars}
      {rating > 0 && <span className="rating-text">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default RatingStars;

