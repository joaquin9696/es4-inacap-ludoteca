"use client";

import { useState, useEffect } from 'react';

export default function ProductosAdmin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleCreateProduct = () => {
    // lógica para crear producto
  };

  const handleUpdateProduct = (id) => {
    // lógica para actualizar producto
  };

  const handleDeleteProduct = (id) => {
    // lógica para eliminar producto
  };

  return (
    <div>
      <h1>Administrar Productos</h1>
      {/* Formulario para crear producto */}
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name}</span>
          <button onClick={() => handleUpdateProduct(product.id)}>Editar</button>
          <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
