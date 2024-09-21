"use client";

import React from "react";
import ReviewCard from "../components/ReviewCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExpartAdviceCard from "../components/ExpartAdviceCard";
import ScientificCultivationCard from "../components/ScientificCultivationCard";
import AI_GeneratedPastSuggestion from "../components/AI_GeneratedPastSuggestion";
import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const App: React.FC = () => {
  const router = useRouter();
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const loginStatus = searchParams.get("login");
    if (loginStatus === "success") {
      setLoginMessage("Google login successful!");
      // Redirect to the home page or dashboard after a short delay
      setTimeout(() => {
        router.push("/"); // You can push to the dashboard or home page
      }, 2000);
    } else if (loginStatus === "failed") {
      router.push("/login");
      setLoginMessage("Google login failed. Please try again.");
    }
  }, []);

  const userData = {
    name: "John Doe",
    profilePic:
      "https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg", // Replace with actual path or URL
    rating: 3,
    review: "I had yellow spots on wheat leaves. Spraying neem oil helped.",
    date: "3 days ago",
  };

  const subTopics = [
    {
      title: "Hydroponics",
      description:
        "Hydroponics is a method of growing plants without soil by using mineral nutrient solutions in an aqueous solvent. This method allows for faster growth and higher yields.",
      imageUrl:
        "https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg",
      fullDescriptionPage: "/full-description/hydroponics",
    },
    {
      title: "Vertical Farming",
      description:
        "Vertical farming is the practice of growing crops in vertically stacked layers. It integrates controlled-environment agriculture, which optimizes plant growth and soilless farming techniques.",
      imageUrl:
        "https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg",
      fullDescriptionPage: "/full-description/vertical-farming",
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section: Carousel */}
      <div>
        <Carousel />
      </div>

      {/* AI-Generated Suggestions */}
      <div className="p-6">
       
        <div>
          <AI_GeneratedPastSuggestion />
        </div>
      </div>

      {/* Scientific Cultivation Systems Section */}
      <section className="container mx-auto p-6 text-center mb-10">
        <h2 className="text-2xl font-bold mb-6">Scientific Cultivation Systems</h2>

        {/* Hydroponics */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          <img
            src="/farming.jpeg"
            alt="Hydroponics"
            className="w-48 h-48 object-cover mr-6"
          />
          <div className="text-left">
            <h3 className="font-bold text-xl mb-2">Hydroponics</h3>
            <p>
              Hydroponics is a method of growing plants without soil by using
              mineral nutrient solutions in an aqueous solvent. This method
              allows for faster growth and higher yields.
            </p>
          </div>
        </div>

        {/* Vertical Farming */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          <img
            src="/farming2.jpeg"
            
            alt="Vertical Farming"
            className="w-48 h-48 object-cover mr-6"
          />
          <div className="text-left">
            <h3 className="font-bold text-xl mb-2">Vertical Farming</h3>
            <p>
              Vertical farming is the practice of growing crops in vertically
              stacked layers. It integrates controlled-environment agriculture,
              which optimizes plant growth and soilless farming techniques.
            </p>
          </div>
        </div>
      </section>

       {/* Expert Advice */}
       <section className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Expert Advice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ExpartAdviceCard
            title="Crop Rotation"
            description="Rotate crops every season to prevent soil depletion and pest accumulation."
            postedDate="1 day ago"
            imageUrl="/crops.jpeg"
            fullDescriptionPage="/full-description-page"
          />
          <ExpartAdviceCard
            title="Organic Fertilizers"
            description="Using organic fertilizers helps maintain soil health."
            postedDate="3 days ago"
            imageUrl="/crops.jpeg"
            fullDescriptionPage="/full-description-page"
          />
          <ExpartAdviceCard
            title="Drip Irrigation"
            description="Drip irrigation conserves water and maximizes crop yield."
            postedDate="2 days ago"
            imageUrl="/crops.jpeg"
            fullDescriptionPage="/full-description-page"
          />
        </div>
      </section>

      {/* User Suggestions */}
      <section className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">User Suggestions</h2>
        <div className="flex justify-center">
          <ReviewCard
            name={userData.name}
            profilePic={userData.profilePic}
            rating={userData.rating}
            review={userData.review}
            date={userData.date}
          />
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
