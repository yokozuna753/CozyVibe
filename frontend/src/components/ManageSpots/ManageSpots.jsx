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
import DeleteSpotButton from "./DeleteSpotButton";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spots);
  const userId = useSelector((state)=> state.session.user.id);

  const { changeContext } = useContext(FunctionContext);

  function handleClick() {
    changeContext("Create a New Spot");
  }

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  let spotsArray = Object.values(spots);

  const userCreatedSpot = spotsArray.find((spot) => spot.ownerId === userId)

  return (
    <div id="manage-spots-page">
      {sessionUser ? (
        <ul className="manage">
          <h2 id="manage-title">Manage Your Spots</h2>
          <NavLink id="create-spot" to="/spots/new">
           {!userCreatedSpot ? <button onClick={handleClick}>Create a New Spot</button> : ""}
          </NavLink>
          <div id="ul-manage">
            {spotsArray.map(
              ({ id, ownerId, name, city, state, avgRating, price, previewImage }) => {
                return ownerId === sessionUser.id ? (
                  <div className="list" key={id}>
                    <div className="tooltip-container">
                      <NavLink to={`/spots/${id}`}>
                        <img className="spot-image" src={previewImage} />
                      </NavLink>
                      <NavLink  to={`/spots/${id}`} className="tooltip-text">{name}</NavLink>
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
                          <FaStar /> {avgRating && avgRating.toString().includes('.') ? avgRating :  avgRating ? `${avgRating}.0` : "New"}{" "}
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

                      <DeleteSpotButton id={id}>Delete</DeleteSpotButton>
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
