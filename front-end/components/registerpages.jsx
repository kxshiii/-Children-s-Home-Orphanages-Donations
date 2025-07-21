// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call registration endpoint
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-12 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Account</h2>
      <Input label="Username" name="username" value={form.username} onChange={handleChange} />
      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
      <Button type="submit" className="w-full mt-2">Register</Button>
    </form>
  );
};

export default RegisterPage;
