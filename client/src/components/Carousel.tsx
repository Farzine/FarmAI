import React, { useState, useEffect } from 'react';

const images = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg',
    text: 'Help us solve plant diseases!',
    description: 'Join us in the fight against crop diseases with your support and donations.'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719695807/samples/breakfast.jpg',
    text: 'Help us solve plant diseases!',
    description: 'Join us in the fight against crop diseases with your support and donations.'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719935885/iakiez3xo3g0v2nxymhj.jpg',
    text: 'Help us solve plant diseases!',
    description: 'Join us in the fight against crop diseases with your support and donations.'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/djmgdgx86/image/upload/v1719695807/samples/breakfast.jpg',
    text: 'Help us solve plant diseases!',
    description: 'Join us in the fight against crop diseases with your support and donations.'
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-500"
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl font-bold mb-4">{images[currentIndex].text}</h1>
          <p className="text-lg mb-8">{images[currentIndex].description}</p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700">
            Click to Diagnose Disease
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
