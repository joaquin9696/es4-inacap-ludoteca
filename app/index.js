import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products from API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    // lógica para agregar al carrito
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">INACAPLudi</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <img src={`/juegos/${product.image}`} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}
