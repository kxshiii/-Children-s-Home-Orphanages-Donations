
import { useState, useEffect } from 'react';

const mockChildrensHomes = [
  {
    id: '1',
    name: 'Sunshine Children\'s Home',
    location: 'Nairobi, Kenya',
    description: 'A loving home providing care, education, and support to vulnerable children in Nairobi.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500',
    children: 45,
    capacity: 60,
    urgentNeeds: ['School supplies', 'Medical care', 'Food'],
    donationsReceived: 15420,
    donationGoal: 25000,
    visits: 127,
    rating: 4.8,
    reviews: [
      { id: '1', user: 'Sarah M.', rating: 5, comment: 'Amazing place with caring staff!', date: '2024-01-15' },
      { id: '2', user: 'John D.', rating: 4, comment: 'Great facilities and wonderful children.', date: '2024-01-10' }
    ],
    contact: {
      phone: '+254 700 123 456',
      email: 'info@sunshinehome.org',
      address: '123 Hope Street, Nairobi'
    },
    availableVisitDates: ['2024-02-15', '2024-02-22', '2024-03-01', '2024-03-08']
  },
  {
    id: '2',
    name: 'Hope Haven Orphanage',
    location: 'Mombasa, Kenya',
    description: 'Dedicated to providing a safe haven and bright future for orphaned children.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500',
    children: 32,
    capacity: 40,
    urgentNeeds: ['Clothing', 'Educational materials', 'Healthcare'],
    donationsReceived: 8750,
    donationGoal: 18000,
    visits: 89,
    rating: 4.6,
    reviews: [
      { id: '3', user: 'Mary K.', rating: 5, comment: 'Incredible work being done here!', date: '2024-01-12' },
      { id: '4', user: 'Peter L.', rating: 4, comment: 'Very well organized and clean.', date: '2024-01-08' }
    ],
    contact: {
      phone: '+254 700 789 012',
      email: 'contact@hopehaven.org',
      address: '456 Care Avenue, Mombasa'
    },
    availableVisitDates: ['2024-02-18', '2024-02-25', '2024-03-04', '2024-03-11']
  },
  {
    id: '3',
    name: 'Little Angels Home',
    location: 'Kisumu, Kenya',
    description: 'Nurturing young hearts and minds with love, education, and opportunities.',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500',
    children: 28,
    capacity: 35,
    urgentNeeds: ['Books', 'Toys', 'Nutritious food'],
    donationsReceived: 12300,
    donationGoal: 20000,
    visits: 156,
    rating: 4.9,
    reviews: [
      { id: '5', user: 'Grace W.', rating: 5, comment: 'The children are so happy and well-cared for!', date: '2024-01-14' },
      { id: '6', user: 'David M.', rating: 5, comment: 'Outstanding facilities and programs.', date: '2024-01-09' }
    ],
    contact: {
      phone: '+254 700 345 678',
      email: 'info@littleangels.org',
      address: '789 Angel Street, Kisumu'
    },
    availableVisitDates: ['2024-02-20', '2024-02-27', '2024-03-06', '2024-03-13']
  }
];

export const useChildrensHomes = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const savedHomes = localStorage.getItem('childrensHomes');
      if (savedHomes) {
        setHomes(JSON.parse(savedHomes));
      } else {
        setHomes(mockChildrensHomes);
        localStorage.setItem('childrensHomes', JSON.stringify(mockChildrensHomes));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const addHome = (homeData) => {
    const newHome = {
      ...homeData,
      id: Date.now().toString(),
      donationsReceived: 0,
      visits: 0,
      rating: 0,
      reviews: [],
      availableVisitDates: []
    };
    
    const updatedHomes = [...homes, newHome];
    setHomes(updatedHomes);
    localStorage.setItem('childrensHomes', JSON.stringify(updatedHomes));
  };

  const updateHome = (id, updates) => {
    const updatedHomes = homes.map(home => 
      home.id === id ? { ...home, ...updates } : home
    );
    setHomes(updatedHomes);
    localStorage.setItem('childrensHomes', JSON.stringify(updatedHomes));
  };

  const deleteHome = (id) => {
    const updatedHomes = homes.filter(home => home.id !== id);
    setHomes(updatedHomes);
    localStorage.setItem('childrensHomes', JSON.stringify(updatedHomes));
  };

  const addReview = (homeId, review) => {
    const updatedHomes = homes.map(home => {
      if (home.id === homeId) {
        const newReviews = [...home.reviews, { ...review, id: Date.now().toString() }];
        const newRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
        return { ...home, reviews: newReviews, rating: Math.round(newRating * 10) / 10 };
      }
      return home;
    });
    setHomes(updatedHomes);
    localStorage.setItem('childrensHomes', JSON.stringify(updatedHomes));
  };

  const makeDonation = (homeId, amount) => {
    const updatedHomes = homes.map(home => {
      if (home.id === homeId) {
        return { ...home, donationsReceived: home.donationsReceived + amount };
      }
      return home;
    });
    setHomes(updatedHomes);
    localStorage.setItem('childrensHomes', JSON.stringify(updatedHomes));
  };

  const scheduleVisit = (homeId, date) => {
    const updatedHomes = homes.map(home => {
      if (home.id === homeId) {
        return { ...home, visits: home.visits + 1 };
      }
      return home;
    });
    setHomes(updatedHomes);
    localStorage.setItem('childrensHomes', JSON.stringify(updatedHomes));
  };

  return {
    homes,
    loading,
    addHome,
    updateHome,
    deleteHome,
    addReview,
    makeDonation,
    scheduleVisit
  };
};
