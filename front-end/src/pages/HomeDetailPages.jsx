// src/pages/HomeDetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const HomeDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <h2 className="text-2xl font-bold mb-2">Children’s Home #{id}</h2>
        <p className="mb-4">Detailed description about this home. Includes needs, staff, facilities, etc.</p>
        <div className="flex flex-col md:flex-row gap-2">
          <Button>Donate</Button>
          <Button>Book a Visit</Button>
          <Button>Write a Review</Button>
        </div>
      </Card>
    </div>
  );
};

export default HomeDetailsPage;
