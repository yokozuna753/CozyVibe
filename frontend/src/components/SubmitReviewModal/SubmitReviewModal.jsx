import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import ReviewInput from "./ReviewInput";
import * as React from "react";
import { createReview } from "../../store/reviews";
import "./SubmitReviewModal.css";

function SubmitReviewModal({ id }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const { closeModal } = useModal();
  const [rating, setRating] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState("");

  const userId = useSelector((state) => state.session.user.id);

  const spotId = useSelector((state) => state.currentSpot.id);

  useEffect(() => {
    // Update the `disabled` state whenever `review` or `rating` changes
    setDisabled(!(review.length > 10 && rating > 0));
  }, [review, rating]);

  const handleSubmit = async (e) => {

      e.preventDefault();
      setErrors("");
      const reviewRequest = {
        review,
        stars: rating,
      };
      const res = await dispatch(createReview(reviewRequest, userId, spotId));
      res.error ? setErrors(res.error) : closeModal()


  };

  // function handleChange(e) {

  //     e.target.value.length > 10 && rating > 0 ? setDisabled(false) : setDisabled(true)
  // }

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal") {
      closeModal();
    }
  };

  const MODAL_STYLES = {
    zIndex: 1000,
    width: "500px",
    backgroundColor: "white",
    gap: "5px",
    borderRadius: "20px",
    border: "1px solid black",
    position: "absolute",
  };

  // create a function that triggers disabled to false
  // the moment there are 10 characters in the text area field

  return (
    <div id="modal" onClick={handleBackgroundClick}>
      <form onSubmit={handleSubmit} style={MODAL_STYLES}>
        <h1>How was your stay?</h1>
        {errors && <h3 id="error-message">* {errors}</h3>}
        <label>
          <textarea
            id="review-box-1"
            type="text"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            placeholder="Leave your review here..."
            required
          />
        </label>
        <ReviewInput rating={rating} setRating={setRating} />

        <button id="review-submit" type="submit" disabled={disabled}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default SubmitReviewModal;
