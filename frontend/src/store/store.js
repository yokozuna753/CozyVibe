import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spots";
import reviewsReducer from "./reviews";
import currentSpotReducer from "./currentSpot";
import spotImagesReducer from './spotImages';

// import createStore, combineReducers, applyMiddleware,
// and compose from the redux package. Import thunk from redux-thunk.

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
  currentSpot: currentSpotReducer,
  spotImages: spotImagesReducer,
});

/*
Initialize an enhancer variable that will be set to different store enhancers depending on whether the 
Node environment is development or production.

In production, the enhancer should only apply the thunk middleware.

In development, you should also apply the logger middleware and the Redux DevTools' compose enhancer. 
To use these tools, create a logger variable that uses the default export of redux-logger. 
(You will need to await a dynamic import for this.) Then, grab the Redux DevTools compose 
enhancer with window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ and store it in a variable called composeEnhancers. 
You can use an or (||) to keep the Redux's original compose as a fallback in case the Redux DevTools are not installed. 
Then set the enhancer variable to the return of the composeEnhancers function passing in applyMiddleware invoked 
with thunk then logger.
*/

let enhancer;

if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// create a configureStore function that takes in an optional preloadedState.
// Return createStore invoked with the rootReducer, the preloadedState, and the enhancer.

const configureStore = (preLoadedState) =>
  createStore(rootReducer, preLoadedState, enhancer);

//  export the configureStore function at the bottom of the file as the default export.
// This function will be used by main.jsx to attach the Redux store to the React application.

export default configureStore;
