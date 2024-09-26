import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScmEntries } from "../../store/common-slice";
import { useNavigate } from "react-router-dom";

const ScientificCultivationCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { scmList, isLoading } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    dispatch(getScmEntries());
  }, [dispatch]);

  const handleSubTopicClick = (fullDescriptionPage) => {
    navigate(fullDescriptionPage);
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Scientific Cultivation Systems
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-8 max-h-[350px] overflow-y-auto">
          {" "}
          {/* Added scrollable container */}
          {scmList && scmList.length > 0 ? (
            scmList.map((scm, index) => (
              <div
                key={index}
                className="flex items-center bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() =>
                  handleSubTopicClick(`/scientific-cultivation/${scm._id}`)
                }
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-32 w-32 rounded-lg object-cover"
                    src={scm.path || "/placeholder.png"}
                    alt={scm.crop_name}
                  />
                </div>
                <div className="ml-6 w-full md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 text-left">
                    {scm.crop_name}
                  </h3>{" "}
                  {/* Added text-left */}
                  <p className="text-sm text-gray-700 leading-relaxed text-left">
                    {" "}
                    {/* Added text-left */}
                    {scm.description.slice(0, 500)}...
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No scientific cultivation methods available yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScientificCultivationCard;
