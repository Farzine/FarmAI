import React from 'react';
import { useRouter } from 'next/navigation';

interface Suggestion {
  id: number;
  image: string;
  title: string;
  description: string;
}

const suggestions: Suggestion[] = [
  {
    id: 1,
    image: '/images.jpeg',
    title: 'Blight Disease',
    description: 'Yellowing leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.Yellowing leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.',
  },
  {
    id: 2,
    image: '/images.jpeg',
    title: 'Powdery Mildew',
    description: 'White powdery spots on leaves.Yellowing leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.',
  },
  {
    id: 3,
    image: '/images.jpeg',
    title: 'Root Rot',
    description: 'Brown, mushy roots leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.',
  },
  {
    id: 4,
    image: '/images.jpeg',
    title: 'Aphid Infestation',
    description: 'Sticky residue on leaves.Yellowing leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.'
  },
  {
    id: 5,
    image: '/images.jpeg',
    title: 'Aphid Infestation',
    description: 'Sticky residue on leaves.Yellowing leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.'
  },
  {
    id: 6,
    image: '/images.jpeg',
    title: 'Aphid Infestation',
    description: 'Sticky residue on leaves.Yellowing leaves with dark spots. Vertical farming is the practice of growing crops in vertically stacked layers.'
  },
  {
    id: 7,
    image: '/images.jpeg',
    title: 'Aphid Infestation',
    description: 'Sticky residue on leaves.Yellowing leaves with dark spots.Vertical farming is the practice of growing crops in vertically stacked layers.'
  },
  {
    id: 8,
    image: '/images.jpeg',
    title: 'Aphid Infestation',
    description: 'Sticky residue on leaves.Yellowing leaves with dark spots.Vertical farming is the practice of growing crops in vertically stacked layers.'
  },
];

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

const AIGeneratedSuggestions: React.FC = () => {
  const router = useRouter();

  const handleViewSuggestion = (suggestion: Suggestion) => {
    router.push(`/suggestion/${suggestion.id}`);
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">AI-Generated Suggestions</h2>
      <div className="flex overflow-x-scroll space-x-5 w-11/12 relative">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg p-4"
          >
            <img src={suggestion.image} alt={suggestion.title} className="w-fit h-fit object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold mb-2">{suggestion.title}</h3>
            <p className="text-gray-600 mb-4">{truncateText(suggestion.description, 30)}</p>
            <button
              onClick={() => handleViewSuggestion(suggestion)}
              className="bg-white text-black px-4 py-2 rounded hover:bg-green-700 border-2 border-green-600"
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
