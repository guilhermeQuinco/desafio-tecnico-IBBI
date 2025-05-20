import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { BASE_URL } from "../../constants";

export const ModalDelete = ({ isOpen, onClose, refreshUsers, user }) => {
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${BASE_URL}/${user.id}`);
      onClose();
      refreshUsers();
    } catch (error) {}
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
          <h1>Confirmar exclusão</h1>
          <span onClick={onClose} style={{ cursor: "pointer" }}>
            X
          </span>
        </div>

        <p>
          Tem certeza que deseja excluir o usuário <strong>{user?.name}</strong>
          ?
        </p>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose}>Cancelar</button>
          <button className="btn-delete" onClick={onDelete}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
