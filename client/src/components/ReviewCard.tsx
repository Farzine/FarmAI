import React from 'react';

interface ReviewCardProps {
  name: string;
  profilePic: string;
  rating: number;
  review: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, profilePic, rating, review, date }) => {
  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg key={i} version="1.1" viewBox="0 0 2048 2048" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            transform="translate(1015,44)"
            d="m0 0h19l18 3 17 6 16 9 10 8 13 13 9 13 8 15 18 42 17 40 27 63 23 54 18 42 23 54 24 56 17 40 27 63 23 54 15 35 1 2 28 3 156 14 385 35 33 4 15 4 12 5 11 6 12 9 13 13 9 13 8 16 6 18 2 10v27l-6 22-7 16-9 14-12 14-8 7-10 9-11 9-13 12-8 7-14 12-11 10-11 9-14 13-11 9-13 12-11 9-13 12-11 9-14 13-11 9-13 12-11 9-12 11-8 7-14 12-11 10-11 9-14 13-11 9-13 12-11 9-14 13-11 9-12 11-8 7-15 13-11 10-11 9-12 11-8 7-14 12-11 10-9 7 1 8 18 80 70 308 27 119 14 62 3 17v23l-4 20-6 15-7 13-10 13-13 13-16 10-16 7-19 5-6 1h-25l-18-4-16-6-23-13-13-8-20-12-32-19-28-17-32-19-20-12-32-19-65-39-32-19-20-12-32-19-28-17-32-19-28-17-29-17-28-17-17-10-5-3h-5l-16 10-27 16-20 12-22 13-25 15-28 17-29 17-25 15-32 19-28 17-32 19-20 12-32 19-65 39-22 13-25 15-32 19-20 12-14 8-15 6-16 4-6 1h-26l-18-4-15-6-14-8-10-8-13-13-9-13-8-16-5-15-2-10-1-11v-9l2-16 8-36 15-66 21-93 65-286 22-97 1-6-8-8-11-9-13-12-11-9-14-13-11-9-13-12-11-9-13-12-11-9-12-11-8-7-10-9-11-9-13-12-11-9-13-12-11-9-14-13-11-9-13-12-11-9-14-13-11-9-12-11-8-7-10-9-11-9-12-11-8-7-14-12-11-10-11-9-13-12-11-9-14-13-11-9-13-12-8-7-14-14-9-14-6-12-6-18-2-8v-32l6-21 8-17 8-12 9-10 9-9 15-10 15-7 12-4 28-4 575-52 6-1 3-9 13-31 13-30 14-33 36-84 11-26 13-31 5-11 23-54 12-28 23-54 45-105 23-54 8-14 11-14 12-11 15-10 15-7 19-5z"
            fill={i < rating ? '#FEC00A' : '#d1d5db'}
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-md mx-auto bg-white text-black shadow-lg rounded-lg p-6 flex">
      <img className="w-12 h-12 rounded-full " src={profilePic} alt={`${name}'s profile`} />
      <div className="flex flex-col flex-grow ">
        <div className='flex flex-row justify-between'>
        <div className="flex items-center ">
          <h5 className="text-lg font-bold">{name}</h5> 
        </div>
        <div className="flex items-center">{renderStars(rating)}</div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{date}</p>
        <p>{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
