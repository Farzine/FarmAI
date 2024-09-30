import AICropDisease from "@/components/farmAI-view/ai-crop-disease";
import AIGeneratedSuggestionsdd from "@/components/farmAI-view/ai-generated-suggestions-dd";
function DignosisPage() {
  return (
    <div className="flex flex-col  min-h-screen bg-gray-100 text-gray-700 mt-16">
      <AICropDisease />
      <AIGeneratedSuggestionsdd />
    </div>
  );
}

export default DignosisPage;
