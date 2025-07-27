import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Calendar, Award, Heart, Phone, Mail, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomeDetailsTabs = ({ home, user, reviewText, setReviewText, reviewRating, setReviewRating, handleReviewSubmit }) => {
  const overviewStats = [
    { icon: Users, label: 'Children', value: home.children, color: 'text-blue-400' },
    { icon: Shield, label: 'Capacity', value: home.capacity, color: 'text-green-400' },
    { icon: Calendar, label: 'Visits', value: home.visits, color: 'text-purple-400' },
    { icon: Award, label: 'Rating', value: home.rating, color: 'text-yellow-400' },
  ];

  return (
    <div className="lg:col-span-2 space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-effect">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="needs">Needs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="floating-card">
            <CardHeader><CardTitle className="text-white">About {home.name}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">{home.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {overviewStats.map(stat => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="needs" className="space-y-6">
          <Card className="floating-card">
            <CardHeader><CardTitle className="text-white">Urgent Needs</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {home.urgentNeeds.map((need, index) => (
                  <div key={index} className="glass-effect rounded-lg p-4 text-center">
                    <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                    <p className="text-white font-medium">{need}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card className="floating-card">
            <CardHeader><CardTitle className="text-white">Reviews ({home.reviews.length})</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {home.reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{review.user}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{review.comment}</p>
                  <p className="text-gray-500 text-xs">{review.date}</p>
                </div>
              ))}
              {user && (
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-white font-medium mb-4">Leave a Review</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} onClick={() => setReviewRating(rating)} className="p-1">
                            <Star className={`h-6 w-6 ${rating <= reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Your Review</label>
                      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share your experience..." className="input-field w-full h-24 resize-none" />
                    </div>
                    <Button onClick={handleReviewSubmit} className="btn-primary">Submit Review</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card className="floating-card">
            <CardHeader><CardTitle className="text-white">Contact Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3"><Phone className="h-5 w-5 text-blue-400" /><span className="text-gray-300">{home.contact.phone}</span></div>
              <div className="flex items-center space-x-3"><Mail className="h-5 w-5 text-green-400" /><span className="text-gray-300">{home.contact.email}</span></div>
              <div className="flex items-center space-x-3"><MapPin className="h-5 w-5 text-purple-400" /><span className="text-gray-300">{home.contact.address}</span></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeDetailsTabs;