import React, { useState } from "react";
import "./Checklist.css";

interface ChecklistAdminProps {
  elements: {
    id: number;
    text: string;
    completed: boolean;
    externalLink?: string; // Añadimos un campo opcional para la URL externa
  }[];
  onClick: () => void;
  data: string[];
}

const ChecklistAdmin: React.FC<ChecklistAdminProps> = ({
  elements,
  onClick,
  data,
}) => {
  const [items, setItems] = useState(elements);

  const toggleItem = (id: number): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const allItemsCompleted = items.every((item) => item.completed);

  const allDocumentsSent = () => {
    if (
      data[33] === "ADJUNTAR_DOCUMENTOS" ||
      data[33] === "VERIFICAR_DOCUMENTOS"
    ) {
      const requiredFields = [34, 36, 37, 38, 39, 54];
      return requiredFields.every((index) => data[index] !== "");
    }
  };

  const checkAllDocumentsSent = allDocumentsSent();

  console.log("Elements", elements);

  return (
    <div className="checklist-container">
      <ul className="checklist">
        {items.map((item) => (
          <li key={item.id}>
            {/* Renderizamos un enlace si todos los documentos están enviados */}
            {checkAllDocumentsSent ? (
              <>
                <a
                  href={item.externalLink} // Usamos la URL externa del elemento
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`checklist-label-${checkAllDocumentsSent}`}
                >
                  {item.text}
                </a>
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                />
              </>
            ) : (
              // Renderizamos un label normal si no todos los documentos están enviados
              <label
                htmlFor={`item-${item.id}`}
                className={`checklist-label-${checkAllDocumentsSent}`}
              >
                {item.text}
              </label>
            )}
          </li>
        ))}
      </ul>
      <div className={`button-container-${allItemsCompleted}`}>
        <button
          className={`button-${allItemsCompleted}`}
          disabled={!allItemsCompleted}
          onClick={onClick}
        >
          Validar
        </button>
        <p className="display-text">Faltan pasos por confirmar.</p>
      </div>
    </div>
  );
};

export default ChecklistAdmin;
