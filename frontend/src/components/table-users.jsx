import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteIcon, Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import { ModalUser } from "./modal/modal-user";
import { BASE_URL } from "../constants";
import { ModalDelete } from "./modal/modal-delete";

const TableUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  async function getUsers() {
    try {
      const response = await axios.get(BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const onCloseModal = () => {
    setIsOpen(false);
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
    setSelectedUser(user);
    setDeleteModal(true);
  };

  return (
    <div className="container">
      <button onClick={handleCreate} style={{ fontSize: "1.2em" }}>
        + Novo
      </button>

      <table>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Nome</th>
            <th style={{ width: "50%" }}>Email</th>
            <th style={{ width: "20%" }}>Status</th>
            <th style={{ textAlign: "right" }}>Opções</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  height: "400px",
                }}
              >
                Nenhum usuário cadastrado.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className="status"
                    style={{
                      background:
                        user.status === "ativo" ? "#114911" : "#790f0f",
                      color: user.status === "ativo" ? "#c9f5c9" : "#f7cccc",
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="flex-between">
                    <button id="actions" onClick={() => handleDelete(user)}>
                      <Trash2 size={20} />
                    </button>
                    <button id="actions" onClick={() => handleEdit(user)}>
                      <SquarePen size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ModalDelete
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        user={selectedUser}
        refreshUsers={getUsers}
      />

      <ModalUser
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
