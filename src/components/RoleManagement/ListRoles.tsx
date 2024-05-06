import React, { useEffect, useState } from 'react';
import { Role } from '../../types/Role'; 

const ListRoles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
   
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3030/docs/api/roles');
        if (response.ok) {
          const data = await response.json();
          setRoles(data.roles);
        } else {
          throw new Error('Erro ao obter as roles');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div>
      <h1>Lista de Roles dos Usuários</h1>
      <ul>
        {roles.map(role => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListRoles;
