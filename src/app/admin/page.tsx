"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "../components/SunLoader/SunLoader";
import ChecklistAdmin from "../components/Checklist/Checklist";
import AdviseAdmin from "../components/Advise/Advise";

import "./admin.css";

export default function AdminHome() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //localStorage.removeItem("email");
    // localStorage.setItem("email", "a01424338@tec.mx"); //! Admin
    // localStorage.setItem("email", "a01423189@tec.mx"); //? No admin

    const email = localStorage.getItem('email');
    if (email) {
      checkForAdmin(email).then((isAdmin) => {
        console.log('IsAdmin', isAdmin);
        if (!isAdmin) {
          // Redirigir al usuario al login si no es un administrador
          router.push('/');
        }
      });
    }
  });

  // Objeto de strings dependiendo del estado
  const state = {
    DIA_PRUEBA: "Agendar día prueba",
    ADJUNTAR_DOCUMENTOS: "Entrega de documentos",
    VERIFICAR_DOCUMENTOS: "Validación de documentos",
    PAGO: "Pago de colegiatura",
    MATERIALES: "Lista de materiales",
    ENTREVISTA: "Entrevista",
    TERMINADO: "Finalizado",
  };

  // Objeto de elementos del requerimiento dependiendo del estado
  const documentos = [
    {
      id: 0,
      text: "Acta de nacimiento",
      completed: false,
      externalLink: data[34],
    },
    { id: 1, text: "INE del padre", completed: false, externalLink: data[38] },
    {
      id: 2,
      text: "INE de la madre",
      completed: false,
      externalLink: data[39],
    },
    {
      id: 3,
      text: "CURP del alumno",
      completed: false,
      externalLink: data[35],
    },
    { id: 4, text: "CURP del padre", completed: false, externalLink: data[36] },
    {
      id: 5,
      text: "CURP de la madre",
      completed: false,
      externalLink: data[37],
    },
  ];

  const elements = {
    undefined: [{ id: 0, text: "No hay información", completed: false }],
    DIA_PRUEBA: [{ id: 0, text: "¿Agendó día de prueba?", completed: false }],
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
    TERMINADO: [],
  };

  // Peticion GET para verificar si el usuario es ADMIN
  const checkForAdmin: (email: string) => Promise<boolean> = async function (
    email: string
  ) {
    try {
      const response = await axios.get(`/api/checkForAdmin/${email}`);
      if (response.data.index === 0) {
        
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error al obtener los datos del servidor:", error);
      return false;
    }
  };

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
        setData([]);
        setLoading(false);
      });
  };

  //Función para obtener los datos desde la barra de busqueda
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
                    placeholder="Correo electrónico..."
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

            {data.length === 0 && (
              <AdviseAdmin message="Realiza una búsqueda válida del correo electrónico para ver la información referente." />
            )}
            {data.length !== 0 && (
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
                {data[33] === "TERMINADO" && (
                  <AdviseAdmin message="El usuario ha concluido su proceso de admisión." />
                )}
                {data[33] != "TERMINADO" && (
                  <ChecklistAdmin
                    elements={elements[data[33]]}
                    onClick={() => changeState(index, data[33])}
                    data={data}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
