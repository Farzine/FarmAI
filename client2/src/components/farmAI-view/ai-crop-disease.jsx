// src/components/AICropDisease.js

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AICropDisease = () => {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/auth/login");
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const token = Cookies.get("token");
      if (!token) handleNavigate();
      const formData = new FormData();
      formData.append("userInputText", description);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/images/analyze`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : "An error occurred while processing your request."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="p-8 w-full max-w-2xl bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          AI Crop Disease Diagnosis
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">
              Describe the symptoms of your infected crops
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Describe the symptoms here..."
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: jpeg, jpg, png. Max size: 2MB.
            </p>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Submit"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {responseData && (
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">
              FarmAI Analysis Result:
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Your Input:</h3>
                <p>{responseData.userInputText}</p>
              </div>

              {responseData.cloudinaryImageUrl && (
                <div>
                  <h3 className="font-semibold">Uploaded Image:</h3>
                  <img
                    src={responseData.cloudinaryImageUrl}
                    alt="Uploaded"
                    className="w-72 h-72 mt-2 ml-36 rounded-md"
                  />
                </div>
              )}

              <div>
                <h3 className="font-semibold">FarmAI Response:</h3>
                <ReactMarkdown className="whitespace-pre-line">
                  {responseData.gptResponse}
                </ReactMarkdown>
              </div>

              {responseData.generatedImageUrl && (
                <div>
                  <img
                    src={responseData.generatedImageUrl}
                    alt="AI Generated image"
                    className="flex items-center justify-center ml-36 w-72 h-72 mt-2 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICropDisease;
