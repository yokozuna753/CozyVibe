import { useEffect } from "react";
import { fetchSpots } from "../../store/spots";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SpotList.css";
import { FaStar } from "react-icons/fa";

// GET all spots to show on landing page

// 1. add a thunk that will fetch all of the spots. ---
// 2. add that action to the reducer and return all the spots ---
// 3. each spot should be in a tile
// each spot should have an image thumbnail

// This is the parent component (<ul>), i will render list items of spots
// (<li>)

function SpotList({ spots }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  spots = Object.values(spots)

  return (
    <div key={1} id="ul">
      {spots.map(
        ({ id, name, city, state, avgRating, price, previewImage }) => {
          return (
            <div className="list" key={`${id}-${price}`}>
              <div className="tooltip-container">
                <NavLink to={`/spots/${id}`}><img className="spot-image" src={previewImage} /></NavLink>
                <NavLink to={`/spots/${id}`} className="tooltip-text">{name}</NavLink>
              </div>
              <div className="spot-list-description">
                <div>
                  {" "}
                  <li>
                    {city}, {state}{" "}
                  </li>
                  <li id="price">{`$${price} night`} </li>
                </div>
                <div className="star-rating">
                  <li>
                    {" "}
                    <FaStar /> { avgRating && avgRating.toString().includes('.') ? avgRating :  avgRating ? `${avgRating}.0` : "New"}{" "}
                  </li>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default SpotList;
