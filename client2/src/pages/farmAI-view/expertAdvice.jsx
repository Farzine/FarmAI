import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExpertAdvice } from "../../store/common-slice/index"; // Ensure the correct path

const ExpertAdvice = () => {
  const dispatch = useDispatch();
  const [selectedAdvice, setSelectedAdvice] = useState(null); // For selecting advice

  // Fetch expert advice from Redux store
  const { expertAdviceList } = useSelector((state) => state.commonFeature);

  // Fetch expert advice data when component mounts
  useEffect(() => {
    dispatch(fetchAllExpertAdvice());
  }, [dispatch]);

  // Function to handle selection of an advice item (missing part)
  const handleSelectAdvice = (advice) => {
    setSelectedAdvice(advice);
  };

 // Function to format description without splitting by full stops
 const formatDescription = (description) => {
  // Split the description by numbered lists (e.g., 1., 2., etc.) and colons
  const descriptionParts = description.split(/(\d+\.\s.*?:)/g);

  return descriptionParts.map((part, index) => {
    // Check if the part starts with a numbered list and ends with a colon
    if (/^\d+\.\s.*?:$/.test(part)) {
      return (
        <div key={index} className="mt-2 block">
          <strong>{part.trim()}</strong> {/* Bold the number and text before the colon */}
          <br /> {/* Start a new line */}
        </div>
      );
    }

    // If not a numbered list with a colon, return the part as-is
    return (
      <React.Fragment key={index}>
        {part.trim()}
      </React.Fragment>
    );
  });
};

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300">
  <h2 className="text-xl font-bold mb-4">Scientific Cultivation System</h2>
  <ul className="space-y-4">
    {expertAdviceList.length > 0 ? (
      expertAdviceList.map((advice) => (
        <li
          key={advice._id}
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleSelectAdvice(advice)} // Handle the advice selection here
        >
          <img
            src={advice.path}
            alt={advice.title}
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-grow pr-4"> {/* Adjusted padding-right */}
            <h3 className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[15rem]"> {/* Fixed width for the title */}
              {advice.title}
            </h3>
            <button className="text-xs text-green-600 border border-green-600 rounded-full px-2 py-1 mt-2">
              Read
            </button>
          </div>
        </li>
      ))
    ) : (
      <p>No expert advice available.</p>
    )}
  </ul>
</div>

      {/* Right Main Content */}
      <div className="w-2/3 bg-white p-8 overflow-y-auto">
        {selectedAdvice ? (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">{selectedAdvice.title}</h2>
            {selectedAdvice.path && (
              <img
                src={selectedAdvice.path}
                alt={selectedAdvice.title}
                className="w-2/3 h-auto mb-4 mx-auto rounded-md my-10" // Adjusting image size
              />
            )}

            {/* Formatted description */}
            <div className="text-md mb-4 mt-8">{formatDescription(selectedAdvice.description)}</div>

          </div>
        ) : (
          <p className="text-lg text-gray-500">Please select an advice to view details.</p>
        )}
      </div>
    </div>
  );
};

export default ExpertAdvice;
