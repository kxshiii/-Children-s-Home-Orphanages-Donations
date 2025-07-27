import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChildrensHomes } from '@/hooks/useChildrensHomes';
import HomeDetailsHeader from '@/components/HomeDetails/HomeDetailsHeader';
import HomeDetailsTabs from '@/components/HomeDetails/HomeDetailsTabs';
import HomeDetailsSidebar from '@/components/HomeDetails/HomeDetailsSidebar';
import { useAuth } from '@/hooks/useAuth.jsx';
import { toast } from '@/components/ui/use-toast';

const HomeDetails = () => {
  const { id } = useParams();
  const { homes, addReview, makeDonation, scheduleVisit } = useChildrensHomes();
  const { user } = useAuth();

  const [donationAmount, setDonationAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const home = homes.find(h => h.id === id);

  if (!home) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Home not found</h2>
          <Link to="/homes">
            <Button className="btn-primary">Back to Homes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDonation = () => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to make a donation.", variant: "destructive" });
      return;
    }
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid donation amount.", variant: "destructive" });
      return;
    }
    makeDonation(home.id, parseFloat(donationAmount));
    toast({ title: "Donation Successful!", description: `Thank you for your $${donationAmount} donation to ${home.name}!` });
    setDonationAmount('');
  };

  const handleVisitSchedule = () => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to schedule a visit.", variant: "destructive" });
      return;
    }
    if (!selectedDate) {
      toast({ title: "Date Required", description: "Please select a visit date.", variant: "destructive" });
      return;
    }
    scheduleVisit(home.id, selectedDate);
    toast({ title: "Visit Scheduled!", description: `Your visit to ${home.name} has been scheduled for ${selectedDate}.` });
    setSelectedDate('');
  };

  const handleReviewSubmit = () => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to leave a review.", variant: "destructive" });
      return;
    }
    if (!reviewText.trim()) {
      toast({ title: "Review Required", description: "Please write a review before submitting.", variant: "destructive" });
      return;
    }
    const review = { user: user.name, rating: reviewRating, comment: reviewText, date: new Date().toISOString().split('T')[0] };
    addReview(home.id, review);
    toast({ title: "Review Submitted!", description: "Thank you for your feedback!" });
    setReviewText('');
    setReviewRating(5);
  };

  return (
    <>
      <Helmet>
        <title>{home.name} - CareConnect</title>
        <meta name="description" content={`Learn more about ${home.name} in ${home.location}. Make donations, schedule visits, and support ${home.children} children in need.`} />
      </Helmet>

      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/homes" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homes
          </Link>
        </div>

        <HomeDetailsHeader home={home} />

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <HomeDetailsTabs 
                home={home}
                user={user}
                reviewText={reviewText}
                setReviewText={setReviewText}
                reviewRating={reviewRating}
                setReviewRating={setReviewRating}
                handleReviewSubmit={handleReviewSubmit}
              />
              <HomeDetailsSidebar 
                home={home}
                donationAmount={donationAmount}
                setDonationAmount={setDonationAmount}
                handleDonation={handleDonation}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleVisitSchedule={handleVisitSchedule}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeDetails;