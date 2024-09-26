import Carousel from "@/components/farmAI-view/carousel";
import AIGeneratedSuggestions from "@/components/farmAI-view/ai-generated-suggestions";
import ExpartAdviceCard from "@/components/farmAI-view/expart-advice-card";
import UserSuggestions from "@/components/farmAI-view/user-suggestion";
import ScientificCultivationCard from "@/components/farmAI-view/scientific-cultivation-card";

function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-700">
      {/* Hero Section with Carousel */}
      <div className="w-full ">
        <Carousel />
      </div>

      {/* AI Generated Suggestions Section */}
      <section className="w-full max-w-6xl px-4 py-12">
        
       
          <AIGeneratedSuggestions />
        
      </section>

      {/* Scientific Cultivation Systems Section */}
      <section className="w-full max-w-6xl px-4 py-12  text-center">
      
        <ScientificCultivationCard />
      </section>

      {/* Expert Advice Section */}
      <section className="w-full max-w-6xl px-4 py-12">
        <h2 className="text-center text-2xl font-semibold mb-8">Expert Advice</h2>
       
          <ExpartAdviceCard />
        
      </section>

      {/* User Suggestions Section */}
      <section className="w-full max-w-6xl px-4 py-12 ">
        
        <div className="grid grid-cols-1  gap-6">
          <UserSuggestions />
        </div>
      </section>
    </div>
  );
}

export default Home;
