import React from 'react';
import { useNavigate } from 'react-router-dom';

const suggestions = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1727367092/c1hceijjvhyux0pbu1gs.jpg',
    title: 'Blight Disease',
    description: 'Yellowing leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1727367865/ulokmdzu0bhcvzjld7kg.jpg',
    title: 'Powdery Mildew',
    description: 'White powdery spots on leaves. Yellowing leaves with dark spots.',
  },
  {
    id: 3,
    image: '/images.jpeg',
    title: 'Root Rot',
    description: 'Brown, mushy roots. Vertical farming is the practice of growing crops in vertically stacked layers.',
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1727368354/o1agwnpigj1ph3dwoyp1.jpg',
    title: 'Aphid Infestation',
    description: 'Sticky residue on leaves. Vertical farming is the practice of growing crops in vertically stacked layers.',
  },
  // More suggestions...
];

const truncateText = (text, maxLength) => {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
};

const AIGeneratedSuggestions = () => {
  const navigate = useNavigate();

  const handleViewSuggestion = (suggestion) => {
    navigate(`/suggestion/${suggestion.id}`);
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-3xl font-bold mb-12 mt-16">AI-Generated Suggestions</h2>
      <div className="flex overflow-x-auto space-x-16">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg p-4"
          >
            <img 
              src={suggestion.image} 
              alt={suggestion.title} 
              className="w-full h-40 object-cover rounded-md mb-4" 
            />
            <h3 className="text-lg font-semibold mb-2">{suggestion.title}</h3>
            <p className="text-gray-600 mb-4">
              {truncateText(suggestion.description, 80)}
            </p>
            <button
              onClick={() => handleViewSuggestion(suggestion)}
              className="bg-white text-black px-4 py-2 rounded-md border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
            >
              View Suggestion
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIGeneratedSuggestions;
