import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExpertAdvice } from '../../store/common-slice'; // Adjust import paths if necessary

const ExpertAdviceForm = () => {
  const dispatch = useDispatch();
  const { expertAdviceList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    dispatch(fetchAllExpertAdvice());
  }, [dispatch]);

  return (
    <div>
      {/* Wrapping the grid inside a horizontally scrollable container */}
      <div className="overflow-x-scroll mt-8">
        <div className="flex space-x-4">
          {expertAdviceList && expertAdviceList.length > 0 ? (
            expertAdviceList.map((advice) => (
              <div key={advice._id} className="border rounded-lg p-4 min-w-[400px] max-w-[300px] mx-auto shadow-lg bg-white">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <img
                      className="h-36 w-28 rounded-lg object-cover"
                      src={advice.path || '/placeholder.png'} // Fallback in case the image is missing
                      alt={advice.title}
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{advice.title}</h2>
                    <p className="text-sm text-gray-600">{advice.description.slice(0, 100)}...</p>
                    <p className="text-xs text-gray-400">Posted {advice.postedDate}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No expert advice available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertAdviceForm;
