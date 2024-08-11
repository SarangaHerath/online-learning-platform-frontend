import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Import useAuth
import { loginUser } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password });
      localStorage.setItem('token', data.token);  // Save the token to local storage
      login(); // Call login function from context
      setMessage('Login successful!');
      navigate('/');  // Redirect to home page
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
          Login
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Login;
