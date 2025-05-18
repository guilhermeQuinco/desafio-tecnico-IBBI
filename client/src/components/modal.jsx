import React, { useState } from "react";

export const Modal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <form>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="E-mail" />
          <select>
            <option value="">Selecione uma Opção</option>
            <option value="ativo">Ativo</option>
            <option value="excluído">Excluído</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Modal;
