'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from "cookies-next"

const Base_URL = 'http://localhost:8000';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginUser = async (username, password) => {
    const urlEncodedBody = new URLSearchParams({
      username,
      password,
    });

    const response = await fetch(`${Base_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncodedBody.toString(),
    });

    console.log(response.headers)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'invalid credentials');
    }

    return response.json();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username && !password) {
      setError('Username is required and Password is required.');
      return;
    }

    if (!username) {
      setError('Username is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);

    try {
      const { access_token } = await loginUser(username, password);
      console.log(access_token, "response from userLogin");
      setCookie("access_token",access_token)
      localStorage.setItem('token', access_token);
      router.push("/dashboard");
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-login bg-cover bg-repeat flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
            Password Manager
          </p>
        </div>
        <h2 className="text-3xl font-semibold text-center">Login</h2>

        <form className="space-y-6 " onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
