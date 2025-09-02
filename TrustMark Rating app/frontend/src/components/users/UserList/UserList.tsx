// src/components/users/UserList/UserList.tsx
import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Example static data (replace with API call)
        const data = [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        ];

        setUsers(data);
        setTotal(data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [page, limit]);

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <p>Total Users: {total}</p>
    </div>
  );
};

export default UserList;
