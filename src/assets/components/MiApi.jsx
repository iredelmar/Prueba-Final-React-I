import React, { useState, useEffect } from "react";

export default function MiApi() {
  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [color, setColor] = useState("");

  // creamos el metodo para capturar los datos
  const getData = async () => {
    const keyApi = "YcV-RkRCxWgIncgIArqqHqtv58mG3RIBJm9OpzNG1aI";
    let urlAPI = `https://api.unsplash.com/search/photos/?client_id=${keyApi}&query=${busqueda}`;
    if (color) {
      urlAPI += `&color=${color}`;
    }
    // console.log(urlAPI);

    const res = await fetch(urlAPI);
    const datosApi = await res.json();
    setResultadoBusqueda(datosApi.results);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [color]);

   return (
    <div>
      <div className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <label>
            Ingresa en inglés, el nombre de la imagen que deseas encontrar,
            ejemplo: dog, house, flower, happy...
          </label>
          <input
            className="form-control me-2"
            placeholder="Ingresa la palabra en ingles"
            onChange={(e) => setBusqueda(e.target.value)}
            type="text"
            value={busqueda}
          />
          <button className="btn btn-outline-success" onClick={() => getData()}>
            Buscar
          </button>
        </div>
      </div>
      <br />
      <div className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <label>
          Filtra tu imagen por color:
          <br />
          <select   className="form-control me-2" value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Cualquier color</option>
            <option value="black_and_white">Blanco y negro</option>
            <option value="black">Negro</option>
            <option value="white">Blanco</option>
            <option value="red">Rojo</option>
            <option value="yellow">Amarillo</option>
            <option value="orange">Naranja</option>
            <option value="blue">Azul</option>
            <option value="green">Verde</option>          
            </select>
        </label>
      </div>
      </div>
      <div className="resultados-busqueda">
        <div className="contenedor-imagen">
        {resultadoBusqueda.map((elemento, indice) => {
            const urlImg = `${elemento.urls.regular}&color=${color}`
            return <img key={indice} src={urlImg} />;
          })}
        </div>
      </div>
    </div>
  );
}
