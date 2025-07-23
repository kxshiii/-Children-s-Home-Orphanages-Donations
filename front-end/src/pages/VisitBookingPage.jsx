
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const VisitBookingPage = () => {
  const [form, setForm] = useState({ name: '', date: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Book a Visit</h2>
      <Input label="Your Name" name="name" value={form.name} onChange={handleChange} />
      <Input label="Visit Date" name="date" type="date" value={form.date} onChange={handleChange} />
      <Button type="submit" className="w-full mt-2">Book Now</Button>
    </form>
  );
};

export default VisitBookingPage;
