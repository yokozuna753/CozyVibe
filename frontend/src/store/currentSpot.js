import { csrfFetch } from "./csrf";


const GET_CURRENT_SPOT = "spots/getCurrentSpot";

function getCurrentSpot(spot) {
  return {
    type: GET_CURRENT_SPOT,
    payload: spot,
  };
}

export const currentSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const data = await response.json();
  dispatch(getCurrentSpot(data));
  return response;
};

const initialState = {};

const currentSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_SPOT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default currentSpotReducer;