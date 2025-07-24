
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import Button from "../components/Button";
import Card from "../components/Card";
import { fetchReviews } from "../features/review/ReviewSlice";

const HomeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const homes = useSelector((state) => state.homes.list);
  const home = homes.find((h) => h.id === parseInt(id));

  const { list: reviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  if (!home) return <p className="text-center">Loading home info...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <h2 className="text-2xl font-bold mb-2">{home.name}</h2>
        <p className="mb-2 text-gray-700">Location: {home.location}</p>
        <p className="mb-4 text-gray-600">
          Detailed description about this home. Includes needs, staff, facilities, etc.
        </p>

        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <Button>Donate</Button>
          <Button>Book a Visit</Button>
          <Button>Write a Review</Button>
        </div>

        <ReviewForm homeId={home.id} />

        <h3 className="text-xl font-semibold mt-6 mb-2">Reviews</h3>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length ? (
          <ul className="space-y-2">
            {reviews.map((rev) => (
              <li key={rev.id} className="bg-gray-100 p-2 rounded">
                <strong>Rating:</strong> {rev.rating}/5 <br />
                <strong>Comment:</strong> {rev.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </Card>
    </div>
  );
};

export default HomeDetailsPage;
