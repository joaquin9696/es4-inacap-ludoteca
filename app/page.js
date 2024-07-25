"use client";

import { useState, useEffect } from 'react';
import Cart from './components/Cart';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    const sameLocation = cart.every(item => item.location === product.location);
    
    if (!sameLocation && cart.length > 0) {
      setError('Todos los productos en el carrito deben ser de la misma ubicación.');
      return;
    }

    if (existingProduct) {
      if (existingProduct.quantity < product.availability) {
        setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        setError('No hay suficiente disponibilidad para este producto.');
      }
    } else {
      if (product.availability > 0) {
        setCart([...cart, { ...product, quantity: 1 }]);
      } else {
        setError('No hay suficiente disponibilidad para este producto.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Ludoteca</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <img src={`/juegos/${product.image}`} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Disponibilidad: {product.availability}</p>
            <p>Ubicación: {product.location}</p>
            <button onClick={() => addToCart(product)} className="bg-blue-500 p-2">Agregar al carrito</button>
          </div>
        ))}
      </div>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}
