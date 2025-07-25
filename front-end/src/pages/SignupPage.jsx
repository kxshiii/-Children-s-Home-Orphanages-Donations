import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate('/login');
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
          <Button type="submit" text="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;