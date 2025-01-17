import { csrfFetch } from "./csrf";
import { currentSpot } from "./currentSpot";

// * GET REVIEWS FOR A SPOT

const GET_REVIEWS = "reviews/getReviews";

function getReviews(reviews) {
  return {
    type: GET_REVIEWS,
    payload: reviews,
  };
}

export const fetchReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  const data = await response.json();
  dispatch(getReviews(data.Reviews));
  return response;
};

//  ! ------------------------------------

// * Create a review for a spot - POST /api/spots/:spotId/reviews

export const createReview = (review, userId, spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
      user: { id: userId },
    });

    console.log("RESPONSE FROM REVIEW CREATED", response);

    let data = await response.json();

    await dispatch(fetchReviews(spotId));
    await dispatch(currentSpot(spotId));

    // dispatch(makeReview(data));

    return response;
  } catch (err) {
    const error = {};
    const data = await err.json();
    error.error = data.message;
    return error;
  }
};

// ! ---------------------------------------

// * DELETE  A REVIEW FOR A A SPOT

// i need to overwrite the reviews with a single review

// 1. create an action creator and pass in the id of the review.
// 2. in the reducer, make a new object and pass in the state
// 3. delete the review using the review id
// 4. return new state from the object

const DELETE_REVIEW = "reviews/deleteReview";

function removeReview(id) {
  return {
    type: DELETE_REVIEW,
    payload: id,
  };
}

export const deleteReview = (reviewId, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  console.log("REVIEW DELETED", data);

  await dispatch(removeReview(reviewId));
  await dispatch(currentSpot(spotId));
  return response;
};

//  ! ------------------------------------

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const reviewObj = {};
      action.payload.forEach((element) => {
        reviewObj[element.id] = element;
      });

      console.log("IN REDUCER REVIEWS", reviewObj);
      return { ...state, ...reviewObj };
    }
    case DELETE_REVIEW: {
      const reviewObj = {...state};
      delete reviewObj[action.payload];

      return { ...reviewObj };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
