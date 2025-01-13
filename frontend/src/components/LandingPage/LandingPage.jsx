import { useEffect } from "react";
import { fetchSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import SpotList from "../SpotList/SpotList";
import "./LandingPage.css";

// GET all spots to show on landing page

// 1. add a thunk that will fetch all of the spots. ---
// 2. add that action to the reducer and return all the spots ---
// This is the parent component (<ul>), i will render list items of spots
// (<li>)

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const spots = useSelector((state) => state.spots);

  return (
    <div id="spot-list">
      <ul>
        <SpotList spots={spots} />
      </ul>
    </div>
  );
}

export default LandingPage;
