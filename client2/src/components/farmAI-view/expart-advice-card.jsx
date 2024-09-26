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
      {/* Displaying expert advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {expertAdviceList && expertAdviceList.length > 0 ? (
          expertAdviceList.map((advice) => (
            <div key={advice._id} className="border rounded-lg p-4 max-w-md mx-auto shadow-lg bg-white">
              <div className="flex">
                <div className="flex-shrink-0">
                  <img
                    className="h-24 w-24 rounded-lg object-cover"
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
  );
};

export default ExpertAdviceForm;
