"use client"

import React from 'react';
import ReviewCard from '../components/ReviewCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExpartAdviceCard from '../components/ExpartAdviceCard';
import ScientificCultivationCard from '../components/ScientificCultivationCard';
import AI_GeneratedPastSuggestion from '../components/AI_GeneratedPastSuggestion';
import Carousel from '../components/Carousel';
import OtpVerification from '@/components/inputOTP';

const App: React.FC = () => {
  const userData = {
    name: 'John Doe',
    profilePic: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg ', // Replace with actual path or URL
    rating: 3,
    review: 'I had yellow spots on wheat leaves. Spraying neem oil helped.',
    date: '3 days ago',
  };

  const subTopics = [
    {
      title: 'Hydroponics',
      description: 'Hydroponics is a method of growing plants without soil by using mineral nutrient solutions in an aqueous solvent. This method allows for faster growth and higher yields hgvhgfhv yguuhjkh gfhug ugyf y uy gugufdy gfugugyfygjgy uy yu gugufvy guyvygu ghchfuyyuycyguuy gyy fy y tg7ugyuyghhbu .',
      imageUrl: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg',
      fullDescriptionPage: '/full-description/hydroponics',
    },
    {
      title: 'Vertical Farming',
      description: 'Vertical farming is the practice of growing crops in vertically stacked layers. It integrates controlled-environment agriculture, which optimizes plant growth and soilless farming techniques.This method allows for faster growth and higher yields hgvhgfhv yguuhjkh gfhug ugyf y uy gugufdy gfugugyfygjgy uy yu gugufvy guyvygu ghchfuyyuycyguuy gyy fy y tg7ugyuyghhbu ',
      imageUrl: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg',
      fullDescriptionPage: '/full-description/vertical-farming',
    },
    {
      title: 'Vertical Farming',
      description: 'Vertical farming is the practice of growing crops in vertically stacked layers. It integrates controlled-environment agriculture, which optimizes plant growth and soilless farming techniques.',
      imageUrl: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg',
      fullDescriptionPage: '/full-description/vertical-farming',
    },
    {
      title: 'Vertical Farming',
      description: 'Vertical farming is the practice of growing crops in vertically stacked layers. It integrates controlled-environment agriculture, which optimizes plant growth and soilless farming techniques.',
      imageUrl: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg',
      fullDescriptionPage: '/full-description/vertical-farming',
    },

  ];

  return (
    <div>
      <Navbar />
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div>
          <OtpVerification email={"farzine07@student.sust.edu"} />
        </div>
        <div>
          <ReviewCard
            name={userData.name}
            profilePic={userData.profilePic}
            rating={userData.rating}
            review={userData.review}
            date={userData.date}
          />
        </div>
        <div className="p-6">
          <ExpartAdviceCard
            title="Crop Rotation"
            description="Rotate crops every season to prevent soil depletion and pest accumulation."
            postedDate="1 day ago"
            imageUrl="https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg"
            fullDescriptionPage="/full-description-page"
          />
        </div>
      </div>
      <div className="p-6 mb-10 bg-gray-100">
        <ScientificCultivationCard
          mainTitle="Scientific Cultivation Systems"
          subTopics={subTopics}
        />
      </div>
      <div >
        <AI_GeneratedPastSuggestion />
      </div>
      <div>
        <Carousel />
      </div>
      <Footer />
    </div>
  );
};

export default App;