"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response from login API:', data);

      if (data.success) {
        setUser(data.user);
        console.log('User logged in:', data.user);
      } else {
        setError(data.message);
        console.error('Login failed:', data.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    setError(null);
    console.log('User logged out');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Image src="/juegos/dice.png" alt="INACAPLudi" width={50} height={50} />
      {user ? (
        <div className="flex items-center space-x-4">
          <div>Bienvenido, {user.real_name}</div>
          <button onClick={handleLogout} className="bg-red-500 p-2">
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="p-2 text-black"
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="p-2 text-black"
            required 
          />
          <button type="submit" className="bg-blue-500 p-2">Ingresar</button>
        </form>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </header>
  );
}
