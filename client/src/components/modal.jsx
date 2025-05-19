import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { BASE_URL } from "../constants";

export const Modal = ({
  title,
  isOpen,
  setIsOpen,
  onClose,
  user = null,
  refreshUsers,
}) => {
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
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await axios.post(BASE_URL, {
        name,
        email,
        password,
        status,
      });
      await refreshUsers();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await axios.patch(`${BASE_URL}/${user.id}`, {
        name,
        email,
        password,
        status,
      });
      await refreshUsers();

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    user ? updateUser() : createUser();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={onClose}
          style={{
            background: "transparent",
            width: "100%",
            height: "fit-content",
            padding: "0",
            textAlign: "right",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <span>X</span>
        </div>
        <h1 style={{ textAlign: "center", color: "#fff" }}>{title}</h1>
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

          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="">Selecione o Status</option>
            <option value="ativo">Ativo</option>
            <option value="excluído">Excluído</option>
          </select>
          <button type="submit" id="submit">
            {isLoading ? <div class="loader"></div> : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
