import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign, Calendar, Clock } from 'lucide-react';
import MpesaDonationDialog from '@/components/ui/MpesaDonationDialog';

const HomeDetailsSidebar = ({ home, donationAmount, setDonationAmount, handleDonation, selectedDate, setSelectedDate, handleVisitSchedule }) => {
  const progressPercentage = (home.donationsReceived / home.donationGoal) * 100;
  const [isMpesaDialogOpen, setIsMpesaDialogOpen] = useState(false);

  const handleMpesaDonation = () => {
    setIsMpesaDialogOpen(true);
  };

  const handleConfirmDonation = () => {
    handleDonation();
    setIsMpesaDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="floating-card">
        <CardHeader><CardTitle className="text-white flex items-center"><Heart className="h-5 w-5 mr-2 text-pink-400" />Make a Donation</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Progress</span>
              <span className="text-white font-medium">${home.donationsReceived.toLocaleString()} / ${home.donationGoal.toLocaleString()}</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }}></div></div>
            <p className="text-xs text-gray-400">{Math.round(progressPercentage)}% of goal reached</p>
          </div>
          <div className="space-y-3">
            <Input type="number" placeholder="Enter amount (KES)" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} className="input-field" />
            <Button onClick={handleMpesaDonation} className="w-full btn-primary"><DollarSign className="h-4 w-4 mr-2" />Donate Now</Button>
          </div>
                      <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 2000].map((amount) => (
                <button key={amount} onClick={() => setDonationAmount(amount.toString())} className="glass-effect rounded-lg py-2 text-sm hover:bg-white/20 transition-colors">KES {amount}</button>
              ))}
            </div>
        </CardContent>
      </Card>

      <Card className="floating-card">
        <CardHeader><CardTitle className="text-white flex items-center"><Calendar className="h-5 w-5 mr-2 text-blue-400" />Schedule a Visit</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-sm">Visit {home.name} and see the impact of your support firsthand.</p>
          <div className="space-y-3">
            <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field w-full">
              <option value="">Select a date</option>
              {home.availableVisitDates.map((date) => (
                <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
              ))}
            </select>
            <Button onClick={handleVisitSchedule} className="w-full btn-secondary"><Clock className="h-4 w-4 mr-2" />Schedule Visit</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="floating-card">
        <CardHeader><CardTitle className="text-white">Quick Stats</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between"><span className="text-gray-300">Total Visits</span><span className="text-white font-medium">{home.visits}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">Reviews</span><span className="text-white font-medium">{home.reviews.length}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">Occupancy</span><span className="text-white font-medium">{Math.round((home.children / home.capacity) * 100)}%</span></div>
        </CardContent>
      </Card>

      <MpesaDonationDialog
        isOpen={isMpesaDialogOpen}
        onClose={() => setIsMpesaDialogOpen(false)}
        donationAmount={donationAmount}
        setDonationAmount={setDonationAmount}
        homeName={home.name}
        onConfirmDonation={handleConfirmDonation}
      />
    </div>
  );
};

export default HomeDetailsSidebar;