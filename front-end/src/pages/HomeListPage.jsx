import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const HomeListPage = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/homes/')
      .then(res => res.json())
      .then(data => setHomes(data))
      .catch(err => console.error("Failed to load homes", err));
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Children’s Homes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {homes.map(home => (
          <Card
            key={home.id}
            title={home.name}
            description={home.description.slice(0, 80) + '...'}
            imageUrl={home.image_url}
            footer={<Link to={`/homes/${home.id}`} className="text-blue-500 hover:underline">View Details</Link>}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeListPage;