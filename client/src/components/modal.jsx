import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";

export const Modal = ({ isOpen, setIsOpen, onClose, user = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPassword(user?.password ?? "");
    setStatus(user?.status ?? "");
  }, [isOpen, user]);

  const createUser = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:3333/users", {
        name,
        email,
        password,
        status,
      });
      setIsLoading(false);
      router;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`http://localhost:3333/users/${user.id}`, {
        name,
        email,
      });
      setIsLoading(false);
      router;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = () => {
    user ? updateUser() : createUser();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="box-input">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setIsVisible((prev) => !prev);
              }}
              id="visible"
            >
              {isVisible ? (
                <EyeClosed className="icon" color="#fff" />
              ) : (
                <Eye className="icon" color="#fff" />
              )}
            </button>
          </div>

          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">Selecione uma Opção</option>
            <option value="ativo">Ativo</option>
            <option value="excluído">Excluído</option>
          </select>
          <button type="submit" id="submit">
            {isLoading ? "Loading..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
