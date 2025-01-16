import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchSpots } from "../../store/spots";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FunctionContext } from "../../context/FormContext";
import "./ManageSpots.css";
import { currentSpot } from "../../store/currentSpot";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spots);

  const { changeContext } = useContext(FunctionContext);

  function handleClick() {
    changeContext("Create a New Spot");
  }

  function handleClick2(e) {
    changeContext("Update your Spot");
    console.log("this is the event", e);
  }

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  let spotsArray = Object.values(spots);

  // const length = spotsArray.length - 1;

  // spotsArray = spotsArray.slice(0, length);

  return (
    <div id="manage-spots-page">
      {sessionUser ? (
        <ul className="manage">
          <h2 id="manage-title">Manage Your Spots</h2>
          <NavLink id="create-spot" to="/spots/new">
            <button onClick={handleClick}>Create a New Spot</button>{" "}
          </NavLink>
          <div id="ul-manage">
            {spotsArray.map(
              ({ id, name, city, state, avgRating, price, previewImage }) => {
                return id === sessionUser.id ? (
                  <div className="list" key={id}>
                    <div className="tooltip-container">
                      <NavLink to={`/spots/${id}`}>
                        <img className="spot-image" src={previewImage} />
                      </NavLink>
                      <span className="tooltip-text">{name}</span>
                    </div>
                    <div id="spot-list-description">
                      <div>
                        {" "}
                        <li>
                          {city}, {state}{" "}
                        </li>
                        <li id="price">{`$${price} night`} </li>
                      </div>
                      <div id="star-rating">
                        <li>
                          {" "}
                          <FaStar /> {avgRating.toString().includes('.') ? avgRating :  avgRating ? `${avgRating}.0` : "New"}{" "}
                        </li>
                      </div>
                    </div>
                    <div className="manage-buttons">
                      <NavLink to={`/spots/${id}/edit`}>
                        {" "}
                        <button
                          onClick={() => {
                            changeContext("Update your Spot");
                            dispatch(currentSpot(id, previewImage));

                          }}
                        >
                          Update
                        </button>
                      </NavLink>

                      <button>Delete</button>
                    </div>
                  </div>
                ) : null;
              }
            )}
          </div>
        </ul>
      ) : (
        navigate("/")
      )}
    </div>
  );
}
