import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { BASE_URL } from "../../constants";

export const ModalUser = ({
  title,
  isOpen,
  setIsOpen,
  onClose,
  user = null,
  refreshUsers,
}) => {
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
      await axios.post(BASE_URL, {
        name,
        email,
        password,
        status,
      });
      setIsOpen(false);
      await refreshUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.patch(`${BASE_URL}/${user.id}`, {
        name,
        email,
        password,
        status,
      });
      setIsOpen(false);
      await refreshUsers();
    } catch (error) {
      console.error(error);
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
          style={{
            background: "transparent",
            width: "100%",
            height: "fit-content",
            padding: "0px",

            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#fff" }}>{title}</h1>
          <span onClick={onClose} style={{ cursor: "pointer" }}>
            X
          </span>
        </div>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <div className="box-input">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <button
              type="button"
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

          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            required
          >
            <option value="">Selecione o Status</option>
            <option value="ativo">Ativo</option>
            <option value="excluído">Excluído</option>
          </select>
          <button type="submit" id="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
