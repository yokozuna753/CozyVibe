import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { fetchReviews } from "../../store/reviews.js";
import PostReviewButton from "./PostReviewButton.jsx";

function Reviews({ spot, reviewsWord }) {
  const dispatch = useDispatch();

  useEffect(() => {
    {
      spot && dispatch(fetchReviews(spot.id));
    }
  }, [dispatch, spot]);

  const user = useSelector((state) => state.session.user);

  const reviews = useSelector((state) => state.reviews);

  const reviewsArray = Object.values(reviews);

  console.log("REVIEWS ======>", reviewsArray);

  //! POST REVIEW BUTTON -
  // user didn't post a review for that Spot yet
  // the user isn't the creator of the spot.

  const userPostedReview =
    reviewsArray &&
    user &&
    reviewsArray.find((review) => Number(review.id) === Number(user.id));

  const current = spot && spot.Owner;

  const isOwner = current && user && current.id === user.id;

  //   if(current) console.log('OWNER ID =>',spot.Owner.id);

  //   if(user) console.log('CURRENT USER =>', user.id);
  //   if (user) console.log("user POSTED OR NOT =>", userPostedReview);
  //   if (current && user) console.log("ARE THEY THE OWNER?? =>", isOwner);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <div>
      {spot && reviews ? (
        <h2 id="reviews-h2">
          {" "}
          <FaStar id="star2" />
          {spot.avgStarRating}
          {" -- "} {spot.numReviews} {`${reviewsWord}`}{" "}
        </h2>
      ) : (
        <h2 id="reviews-h2">
          {" "}
          <FaStar id="star2" />
          New
        </h2>
      )}
      {user && !userPostedReview && !isOwner && <PostReviewButton />}
      <div>
        {reviews
          ? reviewsArray.map((review) => {
              const date = new Date(review.createdAt);
              const formatter = new Intl.DateTimeFormat("en-US", {
                month: "long", // Full month name
                year: "numeric", // Full year
              });

              const formattedDate = formatter.format(date);
              return (
                <div key={review.id}>
                  <h2>{review.User.firstName}</h2>
                  <h4>{formattedDate}</h4>
                  <p>{review.review}</p>
                </div>
              );
            })
          : "Be the first to post a review!"}
      </div>
    </div>
  );
}

export default Reviews;
