import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { currentSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Reviews from "../Reviews/Reviews";
import "./SpotDetail.css";

function SpotDetail() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const spot = useSelector((state) => state.spots["currentSpot"]);

  let owner;

  if (spot) owner = spot.Owner;

  useEffect(() => {
    dispatch(currentSpot(id));
  }, [dispatch, id]);

  let reviewsWord;
  spot && spot.numReviews > 1
    ? (reviewsWord = "reviews")
    : (reviewsWord = "review");

  
  return (
    <div id="details-container">
      {spot && <h2>{spot.name} </h2>}
      {spot && (
        <h4>
          {spot.city}, {spot.state}, {spot.country}{" "}
        </h4>
      )}
      <div id="image-container">
        {spot && <img id="main-image" src={spot["SpotImages"][0].url} />}
        {spot &&
          spot["SpotImages"].slice(1).map((spot) => {
            return (
              <img
                key={spot.id}
                className="detail-images"
                src={`${spot.url}`}
              />
            );
          })}
      </div>
      <div id="container">
        <div id="description">
          {spot && <h2>Hosted by {`${owner.firstName} ${owner.lastName}`}</h2>}
          {spot && <p>{spot.description} </p>}
        </div>
        <div id="review-box">
          {spot && (
            <div>
              <p>
                {`$${spot.price} night`} <FaStar /> {spot.avgStarRating}{" "}
                {" -- "}
                {spot.numReviews} {`${reviewsWord}`}
              </p>
              <button>Reserve</button>
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
