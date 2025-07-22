// src/pages/ReviewPage.jsx
import React, { useState } from 'react';
import Input from './Input';
import Button from '../components/Button';

const ReviewPage = () => {
  const [form, setForm] = useState({ rating: '', comment: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Submit review to backend
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
      <Input label="Rating (1-5)" name="rating" type="number" value={form.rating} onChange={handleChange} />
      <div className="mb-4">
        <label className="block mb-1 font-medium text-sm">Comment</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button type="submit" className="w-full mt-2">Submit Review</Button>
    </form>
  );
};

export default ReviewPage;
