"use client";

export default function Cart({ cart, setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity, availability) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else if (quantity > availability) {
      alert('No hay suficiente disponibilidad para este producto.');
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="border p-4 flex justify-between items-center">
              <div>
                <h3>{item.name}</h3>
                <p>Ubicación: {item.location}</p>
                <p>Disponibilidad: {item.availability}</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.availability)} className="bg-yellow-500 p-2">-</button>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.availability)} className="bg-green-500 p-2">+</button>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 p-2">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
