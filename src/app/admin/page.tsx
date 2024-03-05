"use client";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/SunLoader";

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
    <>
      <div>
        <form>
          <button onClick={(event) => obtain(event)} type="button">
            Search
          </button>{" "}
          {/* Cambiar el tipo de button a "button" */}
          <input id="test" type="text" placeholder="Buscar..."></input>
          <button>&#8942;</button>
        </form>
      </div>

      <div>
        <p>
          Busca el correo de la persona que te interesa para conocer su progreso
        </p>
      </div>

      {/* Mostrar el componente de carga si el estado de carga es verdadero */}
      {loading && <Loading />}

      {/* Mostrar los datos si no hay carga */}
      {!loading && (
        <div>
          <h4>Nombre del papá</h4>
          <p>{data.length > 0 ? data[13] : "Diego Delgado"}</p>

          <h4>Nombre del hijo (a)</h4>
          <p>
            {data.length > 0
              ? data[1] + " " + data[2] + " " + data[3]
              : "Diego Delgado segundo"}
          </p>

          <h4>Correo electrónico</h4>
          <p>{data.length > 0 ? data[12] : "diego@gmail.com"}</p>
        </div>
      )}
    </>
  );
}
