import React, { useState } from 'react';

const AICropDisease = () => {
    const [description, setDescription] = useState('');
    const [suggestion, setSuggestion] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Call your API or AI model here and set the suggestion
      setSuggestion('Your AI suggestion will appear here...');
    };
  
    return (
      <div className="flex justify-start ml-10 h-full">
        <div className=" p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-semibold mb-6 text-start">AI Crop Disease</h1>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Describe the symptoms of your infected crops</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 marker:                 "
                placeholder="Describe the symptoms here..."
                rows="4"
              />
            </div>  
  
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="px-4 py-2 bg-[#38683F] text-white rounded-md hover:bg-green-700"
              >
                Upload Image
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#38683F] text-white rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
  
          <div className="mt-6">
            <h2 className="text-lg font-medium">AI Generated Suggestion:</h2>
            <div className="p-4 mt-2 border rounded-md bg-gray-50">
              {suggestion || 'No suggestions yet...'}
            </div>
          </div>
        </div>
      </div>
    );
  }

export default AICropDisease;
