import React, { useState } from 'react';
import { Role } from '../../types/Role';

const NewRoleForm: React.FC = () => {
  const [roleName, setRoleName] = useState<string>('');

  const handleRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    const newRole: Role = {
      id: Math.random().toString(), 
      name: roleName,
    };

    try {
      const response = await fetch('http://localhost:3030/docs/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });
      if (response.ok) {
       
        console.log('Role cadastrada com sucesso!');
      } else {
        throw new Error('Erro ao cadastrar a Role');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <h1>Cadastro de Nova Role</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome da Role:
          <input type="text" value={roleName} onChange={handleRoleNameChange} />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default NewRoleForm;
