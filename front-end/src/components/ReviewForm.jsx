import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "../features/reviews/reviewSlice";

const ReviewForm = ({ homeId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reviews);

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewPayload = { ...formData, home_id: homeId };
    dispatch(submitReview(reviewPayload));
    setFormData({ rating: "", comment: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={formData.rating}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />
      <br />
      <textarea
        name="comment"
        placeholder="Write your feedback"
        value={formData.comment}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
      {error && <p style={{ color: "red" }}>{error.message || error}</p>}
    </form>
  );
};

export default ReviewForm;
