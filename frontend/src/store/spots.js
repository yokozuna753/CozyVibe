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

const initialState = { spots: {} };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
        const newObj = {};
        action.payload.forEach(element => {
            newObj[element.id] = element;
        });
      return { ...state,  ...newObj };
    default:
      return state;
  }
};

export default spotsReducer;
