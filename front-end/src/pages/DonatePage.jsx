import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const DonatePage = () => {
  const [homes, setHomes] = useState([]);
  const [donation, setDonation] = useState({
    homeId: '',
    amount: '',
    donorName: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/homes')
      .then(res => res.json())
      .then(setHomes);
  }, []);

  const handleChange = (e) => {
    setDonation({
      ...donation,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('http://localhost:5000/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donation)
    });

    if (res.ok) {
      setMessage('Thank you for your donation!');
      setDonation({ homeId: '', amount: '', donorName: '' });
    } else {
      setMessage('Donation failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-700">Make a Donation</h2>
        {message && <p className="text-center text-sm text-green-600 mb-3">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Select Home</label>
            <select
              name="homeId"
              value={donation.homeId}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:ring-blue-500"
            >
              <option value="">--Choose a home--</option>
              {homes.map(home => (
                <option key={home.id} value={home.id}>{home.name}</option>
              ))}
            </select>
          </div>
          <Input name="donorName" label="Your Name" value={donation.donorName} onChange={handleChange} required />
          <Input name="amount" label="Donation Amount (KES)" type="number" value={donation.amount} onChange={handleChange} required />
          <Button text="Donate Now" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default DonatePage;
