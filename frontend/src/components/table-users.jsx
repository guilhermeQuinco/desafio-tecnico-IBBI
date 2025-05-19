import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import Modal from "./modal";
import { BASE_URL } from "../constants";
import SkeletonLoading from "./skeleton-loading";

const TableUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  async function getUsers() {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
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
    try {
      const shouldDelete = confirm(
        `Tem certeza que deseja deletar o usuário ${user.name}?`
      );

      if (!shouldDelete) return;

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
            <th style={{ width: "30%" }}>Nome</th>
            <th style={{ width: "80%" }}>Email</th>
            <th style={{ textAlign: "right" }}>Opções</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <>
              <SkeletonLoading quantity={8} />
            </>
          ) : users.length === 0 ? (
            <tr>
              <td
                colSpan="3"
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
            ))
          )}
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
