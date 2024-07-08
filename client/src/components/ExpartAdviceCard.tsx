import React from 'react';
import { useRouter } from 'next/navigation';

interface TopicCardProps {
  title: string;
  description: string;
  postedDate: string;
  imageUrl: string;
  fullDescriptionPage: string;
}

const ExpartAdviceCard: React.FC<TopicCardProps> = ({ title, description, postedDate, imageUrl, fullDescriptionPage }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(fullDescriptionPage);
  };

  return (
    <div className="border rounded-lg p-4 max-w-md mx-auto shadow-lg bg-white">
      <div className="flex">
        <div className="flex-shrink-0">
          <img className="h-24 w-24 rounded-lg object-cover" src={imageUrl} alt={title} />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{description.slice(0, 100)}...</p>
          <p className="text-xs text-gray-400">Posted {postedDate}</p>
          <button 
            onClick={handleReadMore} 
            className="mt-2 px-4 py-2 bg-white text-black text-sm rounded hover:bg-green-600 border-2 border-green-600 "
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpartAdviceCard;
