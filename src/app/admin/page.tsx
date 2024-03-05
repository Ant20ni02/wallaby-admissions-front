"use client";
import axios from "axios";
import { useState } from "react";

export default function AdminHome() {
  const [data, setData] = useState([]);

  console.log(data);

  const getInfo: (email: string) => void = async function (email: string) {
    await axios
      .get(`/api/getRowByEmail/${email}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setData(res.data.row);
      })
      .catch((err) => console.log(err));
  };

  const obtain: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = async function (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault(); // Evitar que la página se recargue
    var email = (document.getElementById("test") as HTMLInputElement).value;
    await getInfo(email);
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

      <div>
        <h4>Nombre del papá</h4>
        <p>{data.length > 0 ? data[13] : "Diego Delgado"}</p>
        
        <h4>Nombre del hijo (a)</h4>
        <p>{data.length > 0 ? data[1]+" "+data[2]+" "+data[3] : "Diego Delgado segundo"}</p>

        <h4>Correo electrónico</h4>
        <p>{data.length > 0 ? data[12] : "diego@gmail.com"}</p>
      </div>
    </>
  );
}
