"use client"

import React from 'react';
import ReviewCard from '../components/ReviewCard';

const App: React.FC = () => {
  const userData = {
    name: 'John Doe',
    profilePic: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg ', // Replace with actual path or URL
    rating: 3,
    review: 'I had yellow spots on wheat leaves. Spraying neem oil helped.',
    date: '3 days ago',
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <ReviewCard
        name={userData.name}
        profilePic={userData.profilePic}
        rating={userData.rating}
        review={userData.review}
        date={userData.date}
      />
    </div>
  );
};

export default App;