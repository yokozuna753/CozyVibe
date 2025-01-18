import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { currentSpot } from "../../store/currentSpot";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Reviews from "../Reviews/Reviews";
import "./SpotDetail.css";
import { fetchReviews } from "../../store/reviews";

function SpotDetail() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const spot = useSelector((state) => state.currentSpot);
  useSelector((state) => state.reviews);

  let owner;

  if (spot) owner = spot.Owner;

  useEffect(() => {
    dispatch(fetchReviews(id))
    dispatch(currentSpot(id));
  }, [dispatch, id]);

  function handleClick(e){
    e.preventDefault();
    alert("Feature coming soon")
  }

  let reviewsWord;
  spot && spot.numReviews > 1
    ? (reviewsWord = "Reviews")
    : (reviewsWord = "Review");

  
  return (
    
    <div id="details-container">
      {spot && <h2>{spot.name} </h2>}
      {spot && (
        <h4>
        {spot.city}, {spot.state}, {spot.country}{" "}
        </h4>
        )}
        <div id="image-container">
         {spot && spot["SpotImages"] && <img id="main-image" src={spot["SpotImages"].length ? spot["SpotImages"][0].url : ""} />} 
         <div id="smaller-images">

        {spot && spot["SpotImages"] &&
          spot["SpotImages"].slice(1).map((spot) => {
            return (
              <img
              key={spot.id + 1}
              className="detail-images"
              src={`${spot.url}`}
              />
            );
          })} 
          </div>
      </div>
      <div id="container">
        <div id="description">
          {spot && owner && <h2>Hosted by {`${owner.firstName} ${owner.lastName}`}</h2>}
          {spot && <p id="spot-description">{spot.description} </p>}
        </div>
        <div id="review-box">
          {spot && (
            <div id="reserve-div">
              <p>
                {`$${spot.price} night`} <FaStar /> {spot.avgStarRating && spot.avgStarRating.toString().includes('.') ? spot.avgStarRating : `${spot.avgStarRating}.0`}{" "}
                {" · "}
                {spot.numReviews} {`${reviewsWord}`}
              </p>
              <button id="reserve-button" onClick={handleClick}>Reserve</button>
            </div>
          )}
        </div>
      </div>
      <div id="reviews-container">
        <Reviews spot={spot} reviewsWord={reviewsWord} />
      </div> 
    </div>
    
  );
}

export default SpotDetail;
