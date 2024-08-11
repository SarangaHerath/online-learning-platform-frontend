import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signupUser } from '../services/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupUser({ username, password });
      setMessage('Signup successful! Redirecting to login...');
      navigate('/login'); // Navigate to login page after successful signup
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Signup
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Signup;
