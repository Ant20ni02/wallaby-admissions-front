"use client";

import axios from "axios";
import { useState, useEffect } from "react";

import Loading from "../components/SunLoader";
import ChecklistAdmin from "../components/Checklist";
import NoDataAdmin from "../components/NoData";

import "./admin.css";

export default function AdminHome() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Objeto de strings dependiendo del estado
  const state = {
    DIA_PRUEBA: "Agendar día prueba",
    ADJUNTAR_DOCUMENTOS: "Entrega de documentos",
    VERIFICAR_DOCUMENTOS: "Validación de documentos",
    PAGO: "Pago de colegiatura",
    MATERIALES: "Lista de materiales",
    ENTREVISTA: "Entrevista",
  };

  // Objeto de elementos del requerimiento dependiendo del estado
  const documentos = [
    { id: 0, text: "Acta de nacimiento", completed: false },
    { id: 1, text: "INE", completed: false },
    { id: 2, text: "CURP", completed: false },
  ];

  const elements = {
    undefined: [{ id: 0, text: "No hay informacion", completed: false }],
    DIA_PRUEBA: [{ id: 0, text: "¿Agendo día de prueba?", completed: false }],
    ADJUNTAR_DOCUMENTOS: documentos.map((doc) => ({ ...doc })),
    PAGO: [{ id: 0, text: "¿La persona completó su pago?", completed: false }],
    MATERIALES: [
      {
        id: 0,
        text: "¿Se entregó todos los objetos de la lista de materiales?",
        completed: false,
      },
    ],
    ENTREVISTA: [
      { id: 0, text: "¿La persona realizó su entrevista?", completed: false },
    ],
  };

  console.log(data);

  // Peticion GET para obtener la info del usuario
  const getInfo: (email: string) => void = function (email: string) {
    setLoading(true);
    axios
      .get(`/api/getRowByEmail/${email}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setIndex(res.data.index);
        setData(res.data.row);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const obtain = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event instanceof MouseEvent) {
      event.preventDefault();
    } else if (event instanceof KeyboardEvent && event.key !== "Enter") {
      return;
    }

    var email = (document.getElementById("test") as HTMLInputElement).value;
    getInfo(email);
  };

  // Función para obtener el siguiente estado del objeto state
  const getNextState = (currentState: string) => {
    const stateKeys = Object.keys(elements);
    const currentStateIndex = stateKeys.indexOf(currentState);
    if (currentStateIndex !== -1 && currentStateIndex < stateKeys.length - 1) {
      return stateKeys[currentStateIndex + 1];
    }
    return null;
  };

  // Función para enviar la petición POST al servidor
  const changeState = async (rowData: number, currentState: string) => {
    const newState = getNextState(currentState);
    if (!newState) {
      console.log("No hay siguiente estado disponible.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/changeState",
        {
          row: rowData,
          newState: newState,
        }
      );

      getInfo(data[12]);

      console.log("Respuesta del servidor:", response.data);
      console.log("Email", data[12]);
    } catch (error) {
      console.error("Error al enviar la petición:", error);
    }
  };

  return (
    <div>
      <img
        className="logoImage"
        src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png"
        alt="wallabyLogo"
      />
      <div className="container">
        {/* Mostrar el componente de carga si el estado de carga es verdadero */}
        {loading && <Loading />}

        {/* Mostrar los datos si no hay carga */}
        {!loading && (
          <>
            <div className="header">
              <div className="search-bar-header">
                <form className="search-bar">
                  <input
                    id="test"
                    type="text"
                    placeholder="Correo Electrónico..."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        obtain(event);
                      }
                    }}
                  ></input>
                  <button onClick={(event) => obtain(event)} type="button">
                    Search
                  </button>
                </form>
              </div>
              <div className="welcome-header">
                <h3 className="upperText">¡Bienvenido!</h3>
                <p className="lowerText">
                  Busca el correo de la persona que te interesa para conocer su
                  progreso
                </p>
              </div>
            </div>

            {data.length == 0 && <NoDataAdmin />}
            {data.length != 0 && (
              <>
                <div className="info-container">
                  <div>
                    <h4>Nombre del papá</h4>
                    <p>{data.length > 0 ? data[13] : "No hay información"}</p>
                  </div>

                  <div>
                    <h4>Nombre del hijo (a)</h4>
                    <p>
                      {data.length > 0
                        ? data[1] + " " + data[2] + " " + data[3]
                        : "No hay información"}
                    </p>
                  </div>

                  <div>
                    <h4>Correo electrónico</h4>
                    <p>{data.length > 0 ? data[12] : "No hay información"}</p>
                  </div>
                </div>

                <h3 className="upperText">
                  Estado: {data[33] ? state[data[33]] : "No hay información"}
                </h3>

                <ChecklistAdmin
                  elements={elements[data[33]]}
                  onClick={() => changeState(index, data[33])}
                  reloadData={() => getInfo(data[12])}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

//data[12] -> correo
