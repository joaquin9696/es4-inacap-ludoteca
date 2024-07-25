"use client";

import { useState, useEffect } from 'react';

export default function UsuariosAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleCreateUser = () => {
    // lógica para crear usuario
  };

  const handleUpdateUser = (id) => {
    // lógica para actualizar usuario
  };

  const handleDeleteUser = (id) => {
    // lógica para eliminar usuario
  };

  return (
    <div>
      <h1>Administrar Usuarios</h1>
      {/* Formulario para crear usuario */}
      {users.map(user => (
        <div key={user.id}>
          <span>{user.real_name}</span>
          <button onClick={() => handleUpdateUser(user.id)}>Editar</button>
          <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
