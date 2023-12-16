import { useState } from "react";


const StarRating = ({ rating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(null);
  
    const handleMouseOver = (index) => {
      setHoveredRating(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredRating(null);
    };
  
    const handleClick = (index) => {
      onRatingChange(index);
    };
  
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer ${
              index < (hoveredRating || rating) ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };


  export default StarRating;