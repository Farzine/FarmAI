import React from 'react';
import { useRouter } from 'next/navigation';

interface SubTopic {
  title: string;
  description: string;
  imageUrl: string;
  fullDescriptionPage: string;
}

interface ScientificCultivationCardProps {
  mainTitle: string;
  subTopics: SubTopic[];
}

const ScientificCultivationCard: React.FC<ScientificCultivationCardProps> = ({ mainTitle, subTopics }) => {
  const router = useRouter();

  const handleSubTopicClick = (fullDescriptionPage: string) => {
    router.push(fullDescriptionPage);
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">{mainTitle}</h2>
      <div className="relative overflow-y-scroll h-64 no-scrollbar w-auto">
        {subTopics.map((subTopic, index) => (
          <div
            key={index}
            className={`flex items-center mb-8 cursor-pointer pl-60 pr-60`}
            onClick={() => handleSubTopicClick(subTopic.fullDescriptionPage)}
          >
            <div className="flex-shrink-0">
              <img className="h-24 w-24 rounded-lg object-cover" src={subTopic.imageUrl} alt={subTopic.title} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{subTopic.title}</h3>
              <p className="text-sm text-gray-600">{subTopic.description.slice(0, 300)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScientificCultivationCard;
