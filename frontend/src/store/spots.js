import { csrfFetch } from "./csrf";

// * GET SPOTS

const GET_SPOTS = "spots/getSpots";

export function getSpots(spots) {
  return {
    type: GET_SPOTS,
    payload: spots,
  };
}

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getSpots(data.Spots));
  return response;
};

// !-------------------------------

// * CREATE A SPOT

const CREATE_SPOT = "spots/createSpot";

function setSpot(spot) {
  return {
    type: CREATE_SPOT,
    payload: spot,
  };
}

export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  const data = await response.json();

  dispatch(setSpot(data));
  return response;
};

// !---------------------------------

// * UPDATE A SPOT

const UPDATE_SPOT = "spots/updateSpot";

function updateSpot(spot) {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
}

export const update = (spot, id) => async (dispatch) => {
  console.log("SPOT AND ID TO BE UPDATED", spot, id);

  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  const data = await response.json();

  dispatch(updateSpot(data));

  return response;
};

// !-------------------------------------

// !---------------------------------

// * DELETE A SPOT

const DELETE_SPOT = "spots/deleteSpot";

function deleteSpot(spotId) {
  return {
    type: DELETE_SPOT,
    payload: spotId,
  };
}

export const removeSpot = (spotId) => async (dispatch) => {
  // console.log('SPOT AND ID TO BE DELETED', spotId);

  //  ! FINISH THE DELETE SPOT FOR REDUCER
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  // const data = await response.json();

  dispatch(deleteSpot(spotId));

  return response;
};

// !-------------------------------------

// if a spot is fetched, created, or updated, it is done so through the backend

// i need to find a route or method to update the preview image url of a spot?

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS: {
      const newObj = {};
      action.payload.forEach((element) => {
        newObj[element.id] = element;
      });
      return { ...state, ...newObj };
    }
    case CREATE_SPOT: {
      const { id } = action.payload;

      return { ...state, [id]: action.payload };
    }
    case UPDATE_SPOT:

      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id], // Keep existing properties
          ...action.payload, // Apply new updates
          lat:
            action.payload.lat !== undefined
              ? action.payload.lat
              : state[action.payload.id]["lat"], // Retain existing lat if not provided
          lng:
            action.payload.lng !== undefined
              ? action.payload.lng
              : state[action.payload.id]["lng"], // Retain existing lng if not provided
        },
      };
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.payload];
      return { ...newState };
    }
    default:
      return state;
  }
};

export default spotsReducer;
