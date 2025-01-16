import { csrfFetch } from "./csrf";

// *CREATE SPOT IMAGE

const CREATE_SPOT_IMAGE = "spots/createSpotImage";

function setSpotImage(spotImage) {
  return {
    type: CREATE_SPOT_IMAGE,
    payload: spotImage,
  };
}

export const createSpotImage = (spotImage) => async (dispatch) => { // * Add an Image to a Spot once its created

  const response = await csrfFetch(`/api/spots/${spotImage.id}/images`, {
    method: "POST",
    body: JSON.stringify(spotImage),
  });

  const data = await response.json();

    dispatch(setSpotImage(data))

    return response;
};

// !------------------------------

/*
when the user adds an image to the previewimageurl field in the update form
i need to update the previewImage in the spots state.

to update this field, the spots are fetched and the first image found is created as previewImage.


*/

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