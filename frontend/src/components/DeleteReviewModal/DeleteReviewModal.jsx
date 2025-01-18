// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import "./DeleteReviewModal.css";

function DeleteReviewModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

//   const userId = useSelector((state) => state.session.user.id);


// subscribe to the reviews state, grab the id for the review that matches the reviews id for the button clicked
// this should be passed down from the reviews component since it holds the reviews

  const spotId = useSelector((state) => state.currentSpot.id);

  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(deleteReview(id, spotId));
    closeModal();
  };

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
      <div style={MODAL_STYLES}>
        <h1>Confirm Delete</h1>
        {/* {errors && <h3 id="error-message">* {errors}</h3>} */}
        <div id="review-delete-layout">
          <h3>Are you sure you want to remove this review?</h3>
          <button className="review-delete-confirm" onClick={handleClick}>
            Yes{"(Delete Review)"}
          </button>
          <button className="review-delete-confirm" onClick={()=> closeModal()}>No {"(Keep Review)"}</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReviewModal;
