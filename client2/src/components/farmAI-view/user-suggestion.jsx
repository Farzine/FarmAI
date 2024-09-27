import React from 'react';

// Sample user suggestions data
const userSuggestions = [
  {
    name: 'Meraj Mridha',
    date: '3 days ago',
    comment: 'I had yellow spots on wheat leaves. Spraying neem oil helped, Thanks FarmAI',
    rating: 4,
    url:"https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: 'Abu Sayed',
    date: '1 week ago',
    comment: 'Tomato leaves were curling. Reduced watering solved it.',
    rating: 5,
    url:"https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    name: 'Jerrin Jaison',
    date: '2 weeks ago',
    comment: 'Corn stalks were wilting. Used fungicide as suggested by experts.',
    rating: 3,
    url:"https://randomuser.me/api/portraits/women/1.jpg"
  },
];

// User Suggestion Card Component
const UserSuggestionCard = ({ name, date, comment, rating, url }) => {
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md flex flex-col justify-between text-left">
      <div className="flex items-center mb-4">
        <img
          src={`${url}`} // Placeholder image for user avatar
          alt={`${name} avatar`}
          className="rounded-full w-12 h-12 mr-3"
        />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
      <div className="text-gray-700 mb-4 text-sm">{comment}</div>
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
