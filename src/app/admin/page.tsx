"use client";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/SunLoader";
import "./admin.css";

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  console.log(data);

  const getInfo: (email: string) => void = function (email: string) {
    setLoading(true); // Establecer el estado de carga a verdadero
    axios
      .get(`/api/getRowByEmail/${email}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setData(res.data.row);
        setLoading(false); // Establecer el estado de carga a falso cuando se recibe la respuesta
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Establecer el estado de carga a falso en caso de error también
      });
  };

  const obtain: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = function (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault(); // Evitar que la página se recargue
    var email = (document.getElementById("test") as HTMLInputElement).value;
    getInfo(email);
  };

  return (
    <div className="container">
      {/* Mostrar el componente de carga si el estado de carga es verdadero */}
      {loading && <Loading />}

      {/* Mostrar los datos si no hay carga */}
      {!loading && (
        <>
          <div className="header">
            <div className="welcome-header">
              <h3 className="upperText">¡Bienvenido!</h3>
              <p className="lowerText">
                Busca el correo de la persona que te interesa para conocer su
                progreso
              </p>
            </div>

            <div className="search-bar-header">
              <img
                src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png"
                alt="wallabyLogo"
              />
              <form className="search-bar">
                <input
                  id="test"
                  type="text"
                  placeholder="Correo Electrónico..."
                ></input>
                <button onClick={(event) => obtain(event)} type="button">
                  Search
                </button>
              </form>
            </div>
          </div>

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
        </>
      )}
    </div>
  );
}
