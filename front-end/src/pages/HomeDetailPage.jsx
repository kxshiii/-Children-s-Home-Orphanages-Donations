import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import { fetchReviews } from "../features/reviews/reviewSlice";

const HomeDetailPage = () => {
  const { id } = useParams(); // get home ID from URL
  const dispatch = useDispatch();

  const homes = useSelector((state) => state.homes.list);
  const home = homes.find((h) => h.id === parseInt(id));

  const { list: reviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  if (!home) return <p>Loading home info...</p>;

  return (
    <div>
      <h2>{home.name}</h2>
      <p>Location: {home.location}</p>

      <ReviewForm homeId={home.id} />

      <h3>Reviews</h3>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length ? (
        <ul>
          {reviews.map((rev) => (
            <li key={rev.id}>
              <strong>Rating:</strong> {rev.rating}/5 <br />
              <strong>Comment:</strong> {rev.comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default HomeDetailPage;
