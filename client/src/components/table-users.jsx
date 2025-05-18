import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import Modal from "./modal";

const TableUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
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
    setSelectedUser(false);
  }

  function handleCreate() {
    setSelectedUser(null);
    setIsOpen(true);
  }

  console.log(selectedUser);

  return (
    <div className="container">
      <button onClick={handleCreate}>Novo</button>
      <table>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Opções</th>
        </tr>

        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="flex-between">
              <div>
                <Trash2 />
              </div>
              <button
                onClick={() => {
                  setSelectedUser({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  });

                  setIsOpen(true);
                }}
              >
                <SquarePen />
              </button>
            </td>
          </tr>
        ))}
      </table>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={onCloseModal}
        user={selectedUser || null}
      />
    </div>
  );
};

export default TableUsers;
