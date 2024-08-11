import React, { useState } from 'react';
import { getGPTRecommendations } from '../services/api';

const GPTRecommendation = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const { data } = await getGPTRecommendations(prompt, token);
    setRecommendations(data.recommendations);
  };

  // Function to format recommendations into a list
  const formatRecommendations = (recommendations) => {
    const courses = recommendations.split('. ').filter(course => course.trim() !== '');
    return courses.map((course, index) => <li key={index}>{course}</li>);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Get Course Recommendations</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your career goal"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Get Recommendations
        </button>
      </form>
      {recommendations && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Recommended Courses:</h3>
          <ul className="list-disc list-inside">
            {formatRecommendations(recommendations)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GPTRecommendation;
