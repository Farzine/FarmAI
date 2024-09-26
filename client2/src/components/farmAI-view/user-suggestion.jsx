import React from 'react';

// Sample user suggestions data
const userSuggestions = [
  {
    name: 'John Doe',
    date: '3 days ago',
    comment: 'I had yellow spots on wheat leaves. Spraying neem oil helped.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    date: '1 week ago',
    comment: 'Tomato leaves were curling. Reduced watering solved it.',
    rating: 5,
  },
  {
    name: 'Mike Johnson',
    date: '2 weeks ago',
    comment: 'Corn stalks were wilting. Used fungicide as suggested by experts.',
    rating: 5,
  },
];

// User Suggestion Card Component
const UserSuggestionCard = ({ name, date, comment, rating }) => {
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md flex flex-col justify-between text-left">
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/50" // Placeholder image for user avatar
          alt={`${name} avatar`}
          className="rounded-full w-12 h-12 mr-3"
        />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
      <div className="text-gray-700 mb-4">{comment}</div>
      <div className="text-yellow-500">{'⭐'.repeat(rating)}</div>
    </div>
  );
};

// User Suggestions Component
const UserSuggestions = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">User Suggestions</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {userSuggestions.map((suggestion, index) => (
          <UserSuggestionCard key={index} {...suggestion} />
        ))}
      </div>
    </div>
  );
};

export default UserSuggestions;
