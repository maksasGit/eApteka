import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of users from your Spring Boot endpoint
    axios.get('http://localhost:8080/users') // Replace with your Spring Boot server URL
      .then(response => {
        setUsers(response.data.content);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
