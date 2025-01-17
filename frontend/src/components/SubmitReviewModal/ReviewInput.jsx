import { FaStar } from "react-icons/fa6";
import { useState } from "react";
import "./SubmitReviewModal.css";

const ReviewInput = ({rating, setRating}) => {
  const [activeRating, setActiveRating] = useState(0);
  
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div className="rating-input">
        <div
          className={activeRating >= 1 ? "filled" : "empty"}
          onMouseEnter={() =>
            disabled ? setActiveRating(rating) : setActiveRating(1)
          }
          onMouseLeave={() =>
            setActiveRating(rating)
          }
          onClick={() => setRating(1)}
        >
          <FaStar />
        </div>
        <div
          className={activeRating >= 2 ? "filled" : "empty"}
          onMouseEnter={() =>
            disabled ? setActiveRating(rating) : setActiveRating(2)
          }
          onMouseLeave={() =>
            disabled ? setActiveRating(rating) : setActiveRating(rating)
          }
          onClick={() => setRating(2)}
        >
          <FaStar />
        </div>
        <div
          className={activeRating >= 3 ? "filled" : "empty"}
          onMouseEnter={() =>
            disabled ? setActiveRating(rating) : setActiveRating(3)
          }
          onMouseLeave={() =>
            disabled ? setActiveRating(rating) : setActiveRating(rating)
          }
          onClick={() => setRating(3)}
        >
          <FaStar />
        </div>
        <div
          className={activeRating >= 4 ? "filled" : "empty"}
          onMouseEnter={() =>
            disabled ? setActiveRating(rating) : setActiveRating(4)
          }
          onMouseLeave={() =>
            disabled ? setActiveRating(rating) : setActiveRating(rating)
          }
          onClick={() => setRating(4)}
        >
          <FaStar />
        </div>
        <div
          className={activeRating >= 5 ? "filled" : "empty"}
          onMouseEnter={() =>
            disabled ? setActiveRating(rating) : setActiveRating(5)
          }
          onMouseLeave={() =>
            disabled ? setActiveRating(rating) : setActiveRating(rating)
          }
          onClick={() => {
            setRating(5)
          }}
        >
          <FaStar />
        </div>
        Stars
      </div>
    </>
  );
};

export default ReviewInput;
