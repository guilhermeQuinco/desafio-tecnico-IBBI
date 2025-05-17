import React, { useEffect, useState } from "react";
import axios from "axios";

const TableUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get("http://localhost:3333/users");

      setUsers(response.data);
    }

    getUsers();
  }, []);

  console.log(users);

  return (
    <div className="container">
      <table>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Opções</th>
        </tr>
        <tr>
          {users.map((user) => (
            <>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="flex-between">
                <div>excluir</div>
                <div>excluir</div>
              </td>
            </>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default TableUsers;
