import { csrfFetch } from "./csrf";

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

const CREATE_REVIEW = "reviews/createReview";

// function makeReview(review) {
//   return {
//     type: CREATE_REVIEW,
//     payload: review,
//   };
// }

export const createReview = (review, userId, spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
      user: { id: userId },
    });

    console.log("RESPONSE FROM REVIEW CREATED", response);

    let data = await response.json();

    dispatch(fetchReviews(spotId));

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

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const reviewObj = {};
      action.payload.forEach((element) => {
        reviewObj[element.id] = element;
      });
      return { ...state, ...reviewObj };
    }
    // case CREATE_REVIEW: {
    //   return { ...state, [action.payload.id]: action.payload };
    // }
    default:
      return state;
  }
};

export default reviewsReducer;
