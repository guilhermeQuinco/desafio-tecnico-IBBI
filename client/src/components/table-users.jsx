import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import Modal from "./modal";
import { BASE_URL } from "../constants";

const TableUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  async function getUsers() {
    const response = await axios.get(BASE_URL);

    setUsers(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);

  const onCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(false);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      status: user.status,
    });

    setIsOpen(true);
  };

  const handleDelete = async (user) => {
    try {
      alert(`Tem certeza que deseja deletar o usuário ${user.name}?`);
      await axios.delete(`${BASE_URL}/${user.id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button onClick={handleCreate}>Novo</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="flex-center">
                <div className="flex-between">
                  <button
                    id="actions"
                    className="trash"
                    onClick={() => handleDelete(user)}
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    className="edit"
                    id="actions"
                    onClick={() => handleEdit(user)}
                  >
                    <SquarePen size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={onCloseModal}
        user={selectedUser || null}
        title={selectedUser ? "Editar usuário" : "Cadastrar usuário"}
        refreshUsers={getUsers}
      />
    </div>
  );
};

export default TableUsers;
