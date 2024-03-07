import React, { useState } from "react";
import "./Checklist.css";

// Definición de las props del componente
interface ChecklistAdminProps {
  elements: {
    id: number;
    text: string;
    completed: boolean;
  }[];
  onClick: () => void;
  reloadData: () => void;
}

const ChecklistAdmin: React.FC<ChecklistAdminProps> = ({
  elements,
  onClick,
}) => {
  const [items, setItems] = useState(elements);

  // Cambia el estado de completado
  const toggleItem = (id: number): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Verifica si todos los elementos están completados
  const allItemsCompleted = items.every((item) => item.completed);

  return (
    <div className="checklist-container">
      <ul className="checklist">
        {items.map((item) => (
          <li key={item.id}>
            <label htmlFor={`item-${item.id}`}>{item.text}</label>
            <input
              type="checkbox"
              id={`item-${item.id}`}
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
            />
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
