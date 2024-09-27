import React from 'react';
import { useNavigate } from 'react-router-dom';

const suggestions = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1727368354/o1agwnpigj1ph3dwoyp1.jpg',
    title: 'Tomato Leaf Spot',
    description: 'Tomato plant showing symptoms of leaf spot disease. Advised to use copper-based fungicides.',
    date: '2023-04-12'
  },
  {
    id: 2,
    image: '/images.jpeg',
    title: 'Wheat Yellow Rust',
    description: 'Wheat field affected by yellow rust. Recommended treatment: fungicide spray.',
    date: '2023-03-20'
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1727367865/ulokmdzu0bhcvzjld7kg.jpg',
    title: 'Potato Late Blight',
    description: 'Potato plant suffering from late blight. Advised to use metalaxyl-based fungicides.',
    date: '2023-02-18'
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1727367092/c1hceijjvhyux0pbu1gs.jpg',
    title: 'Aphid Infestation',
    description: 'Sticky residue on leaves. Vertical farming is the practice of growing crops in vertically stacked layers.',
  },
  // More suggestions...
];

const truncateText = (text, maxLength) => {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
};

const AIGeneratedSuggestionsdd = () => {
  const navigate = useNavigate();

  const handleCardClick = (suggestion) => {
    navigate(`/suggestion/${suggestion.id}`);
  };

  return (
    <div className="flex flex-col items-start ml-10 p-8 w-full">
      <h2 className="text-2xl font-bold mb-8">AI-Generated Past Suggestions</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center bg-white shadow-lg rounded-lg w-96 p-4 cursor-pointer"
            onClick={() => handleCardClick(suggestion)}
          >
            <div className="flex flex-col justify-between w-2/3 pr-4">
              <h3 className="text-lg font-semibold mb-2">{suggestion.title}</h3>
              <p className="text-gray-600 mb-2">
                {truncateText(suggestion.description, 80)}
              </p>
              <p className="text-gray-500">Suggested on: {suggestion.date}</p>
            </div>
            <img 
              src={suggestion.image} 
              alt={suggestion.title} 
              className="w-1/3 h-32 object-cover rounded-md" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIGeneratedSuggestionsdd;
