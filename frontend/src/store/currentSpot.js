import { csrfFetch } from "./csrf";


const GET_CURRENT_SPOT = "spots/getCurrentSpot";

function getCurrentSpot(spot, previewImage) {
  return {
    type: GET_CURRENT_SPOT,
    payload: spot,
    previewImage
  };
}

export const currentSpot = (id, previewImage) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const data = await response.json();
  dispatch(getCurrentSpot(data, previewImage));
  return response;
};

const initialState = {};

const currentSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_SPOT:
      const currentSpot = {...action.payload};
      currentSpot.previewImage = action.previewImage;
      

      return { ...state, ...currentSpot, };
    default:
      return state;
  }
};

export default currentSpotReducer;