import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { currentSpot } from "../../store/currentSpot.js";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import { fetchReviews } from "../../store/reviews.js";
import PostReviewButton from "./PostReviewButton.jsx";
import DeleteReviewButton from "./DeleteReviewButton.jsx"
import './Reviews.css'

function Reviews({ spot, reviewsWord }) {
  const dispatch = useDispatch();

  const id = useParams().id;

  let spotReviews = [];
  const user = useSelector((state) => state.session.user);

  // get the reviews state
  const reviews = useSelector((state) => state.reviews);




  // make the reviews state object into an array
  const reviewsArray = Object.values(reviews).reverse();

  reviewsArray.forEach((review) => {
    if (review.spotId === spot.id) spotReviews.push(review);
  });

  // useEffect(()=> {
  //   dispatch(fetchReviews(spot.id));
  // }, [dispatch, spot.id])
  
  
  useEffect(() => {
    {
      spot && dispatch(fetchReviews(spot.id));
    }
  }, [dispatch, spot]);

  // get the current user

  // define an array to push reviews into

  // find the reviews in the state that match the spot id of the current spot

  //! POST REVIEW BUTTON -
  // user didn't post a review for that Spot yet
  // the user isn't the creator of the spot.

  // if spot reviews exist AND if the current user exists, return a boolean to see if user posted the review
  const userPostedReview =
    spotReviews &&
    user &&
    spotReviews.find((review) => Number(review.userId) === Number(user.id))
      ? true
      : false;

  // if the spot exists, get the owner of the spot
  const current = spot && spot.Owner;

  // check if the owner's id matches the user id, return a boolean
  const isOwner = current && user ? current.id === user.id: false;

    // if(user) console.log('CURRENT USER =>', user.id);
    // if (user) console.log("user POSTED OR NOT =>", userPostedReview);
    // if (current && user) console.log("ARE THEY THE OWNER?? =>", isOwner);
    // console.log('SPOT REVIEWS ===>', spotReviews);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



  return (
    <div id="reviews">
      {spot && spot.numReviews > 0 ? ( // if the spot exists and it has reviews, render the below
        <h2 id="reviews-h2">
          {" "}
          <FaStar id="star2" />
          {spot.avgStarRating && spot.avgStarRating.toString().includes(".")
            ? spot.avgStarRating
            : `${spot.avgStarRating}.0`}
          {" · "} {spot.numReviews} {`${reviewsWord}`}{" "}
        </h2>
      ) : (
        // if it doesnt exist, render the below
        <h2 id="reviews-h2">
          {" "}
          <FaStar id="star2" />
          New
        </h2>
      )}
      {user && !userPostedReview && !isOwner ? <div className="post-review-button"> <PostReviewButton className="post-review-button"  id={id} /></div> : ""}

      {spotReviews && (
        <div >
          {spotReviews.length  ? (
            spotReviews.map((review) => {
              const date = new Date(review.createdAt);
              const formatter = new Intl.DateTimeFormat("en-US", {
                month: "long", // Full month name
                year: "numeric", // Full year
              });

              const formattedDate = formatter.format(date);
              return (
                review && (
                  <div className="spot-reviews" key={review.id}>
                    <h2>{review.User.firstName}</h2>
                    <h4>{formattedDate}</h4>
                    <p className="review-text">{review.review}</p>
                    { user && user.id === review.userId && userPostedReview ? <DeleteReviewButton id={review.id} >Delete</DeleteReviewButton> : ""  }
                  </div>
                )
              );
            })
          ) : (
            !isOwner ? <h4>Be the first to post a review!</h4> : ""
          )}
        </div>
      )}
    </div>
  );
}

export default Reviews;
