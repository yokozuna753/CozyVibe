import { csrfFetch } from "./csrf";

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
  console.log("THIS IS THE DATA", data);

  dispatch(setSpot(data));
  return response;
};

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

const UPDATE_SPOT = "spots/updateSpot";

function updateSpot(spot){
  return {
    type: UPDATE_SPOT,
    payload: spot
  }
}

export const update = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots/:spotId", {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  console.log('THE RESPONSE', response);

  // const data = await response.json();

  // dispatch(updateSpot(data));

  // return response;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const newObj = {};
      action.payload.forEach((element) => {
        newObj[element.id] = element;
      });
      return { ...state, ...newObj };
    case CREATE_SPOT:
      const { id } = action.payload;
      console.log("PAYLOAD ===> ", action.payload);
      return { ...state, [id]: action.payload };
    case GET_CURRENT_SPOT:
      return { ...state, currentSpot: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;
