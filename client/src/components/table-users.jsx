import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import Modal from "./modal";

const TableUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get("http://localhost:3333/users");

      setUsers(response.data);
    }

    getUsers();
  }, []);

  console.log(users);

  function onCloseModal() {
    setIsOpen(false);
  }

  function addNewUser() {
    setIsOpen(true);
  }

  return (
    <div className="container">
      <button onClick={addNewUser}>Novo</button>
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
                <div>
                  <Trash2 />
                </div>
                <div>
                  <SquarePen />
                </div>
              </td>
            </>
          ))}
        </tr>
      </table>

      <Modal isOpen={isOpen} onClose={onCloseModal} />
    </div>
  );
};

export default TableUsers;
