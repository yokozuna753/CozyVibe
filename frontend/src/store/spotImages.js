import { csrfFetch } from "./csrf";

// *CREATE SPOT IMAGE

const CREATE_SPOT_IMAGE = "spots/createSpotImage";

function setSpotImage(spotImage) {
  return {
    type: CREATE_SPOT_IMAGE,
    payload: spotImage,
  };
}

export const createSpotImage = (spotImage) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotImage.id}/images`, {
    method: "POST",
    body: JSON.stringify(spotImage),
  });

  const data = await response.json();

    dispatch(setSpotImage(data))

    return response;
};

// !------------------------------

const initialState = {};

const spotImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SPOT_IMAGE:
      return { ...state, [action.payload.id]: {...action.payload} };
    default:
      return state;
  }
};


export default spotImagesReducer;