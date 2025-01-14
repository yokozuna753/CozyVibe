import { csrfFetch } from "./csrf";

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

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reviewsReducer;
