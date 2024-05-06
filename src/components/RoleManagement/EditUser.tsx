import React, { useState, useEffect } from 'react';
import { Role } from '../../types/Role';
import { User } from '../../types/User'; 

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

 
  useEffect(() => {
    const mockUser: User = {
      id: '1',
      name: 'Usuário de Exemplo',
      email: 'usuario@example.com',
      roles: ['role1'], 
    };
    setUser(mockUser);

    const mockRoles: Role[] = [
      { id: 'role1', name: 'Role 1' },
      { id: 'role2', name: 'Role 2' },
      { id: 'role3', name: 'Role 3' },
    ];
    setRoles(mockRoles);
  }, []);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roleId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedRoles(prevSelectedRoles => {
      if (isChecked) {
        return [...prevSelectedRoles, roleId];
      } else {
        return prevSelectedRoles.filter(id => id !== roleId);
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    const updatedUser: User = {
      ...user!,
      roles: selectedRoles,
    };

    try {
      const response = await fetch(`http://localhost:3030/docs/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        console.log('Usuário atualizado com sucesso!');
      } else {
        throw new Error('Erro ao atualizar o usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Editar Usuário: {user.name}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <strong>Roles:</strong>
          {roles.map(role => (
            <div key={role.id}>
              <label>
                <input
                  type="checkbox"
                  value={role.id}
                  checked={selectedRoles.includes(role.id)}
                  onChange={handleRoleChange}
                />
                {role.name}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditUser;
