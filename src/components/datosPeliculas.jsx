

import { Fragment, useState, useRef, useEffect } from "react";
import PeliculaItem from "./valPelicula.jsx";
import uuid4 from "uuid4";
import "../styles/style.css";




const PeliculasFav = () => {
    const [peliculas, setPeliculas] = useState([]);
    
    // refs del formulario
    const tituloRef = useRef();
    const anioRef = useRef();
    const generoRef = useRef();
    
    const KEY = "peliculas";
  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem(KEY));
    if (guardadas) {
        setPeliculas(guardadas)
    }
  }, []);

  // Guardar en localStorage al cambiar peliculas
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(peliculas));
  }, [peliculas]);

  const agregarPelicula = () => {
    const tituloP = tituloRef.current.value.trim();
    const anioP = anioRef.current.value;
    const generoP = generoRef.current.value;

    const busPelicula = document.getElementsByName("puntuacion");

    let punPelicula = "";

    for (let opcion of busPelicula) {
      if (opcion.checked) {
        punPelicula = opcion.value;
        break;
      }
    }

    // validacion en caso de no completar los campos
    if (!tituloP || !anioP || busPelicula === '0' || !punPelicula) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setPeliculas((prevPelis) => {
        // Crear objeto pelicula
        const nuevaPelicula = {
            id: uuid4(),
            titulo: tituloP,
            anio: anioP,
            genero: generoP,
            puntuacion: punPelicula,
        }
        return [...prevPelis, nuevaPelicula];
    });

    tituloRef.current.value = "";
    anioRef.current.value = "";
    generoRef.current.value = "0";
    busPelicula.forEach((opcion) => (opcion.checked = false));
  };

  const eliminarPelicula = (id) => {
    setPeliculas((prevPeli) => prevPeli.filter((pelic) => pelic.id !== id));
  };

  const editarPelicula = (id) => {
    const peli = peliculas.find((pelic) => pelic.id === id);
    if (!peli) return;

    const newTitulo = prompt("Nuevo titulo:", peli.titulo);
    if (!newTitulo) return;

    const newAnio = prompt("Ingrese el nuevo año [Formato -> YYYY-MM-DD]:", peli.anio);
    if (!newAnio) return;

    const newGenero = prompt("Ingrese un nuevo genero:", peli.genero);
    if (!newGenero) return;

    const newPuntuacion = prompt("Ingrese una nueva puntuacion [entre 1-5 ★]:", peli.puntuacion);
    if (!newPuntuacion) return;


    setPeliculas((prevPeli) =>
      prevPeli.map((datoPel) => {
        if (datoPel.id === id) {
          return { // cambia los valores
            ...datoPel,
            titulo: newTitulo,
            anio: newAnio,
            genero: newGenero,
            puntuacion: newPuntuacion,
          };
        } else {
          return datoPel; // no modifica nada
        }
      })
    );


  };

  return (
      <Fragment>
        <div className="container my-4">
          <h1 className="text-center bebas-neue-regular mb-4">¿Cuáles son tus peliculas favoritas?</h1>

          <div className="row g-4 justify-content-center">
            {/* Formulario de entrada */}
            <div className="col-12 col-md-8">
              <div className="card bg-warning p-3">
                <div className="mb-3">
                  <label htmlFor="idTitulo" className="form-label">Titulo de la pelicula:</label>
                  <input type="text" id="idTitulo" ref={tituloRef} className="form-control" placeholder="Titulo de la pelicula" />
                </div>

                <div className="mb-3">
                  <label htmlFor="idAnio" className="form-label">Fecha de la pelicula:</label>
                  <input type="date" id="idAnio" ref={anioRef} className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="idGenero" className="form-label">Ingrese el genero de la pelicula:</label>
                  <select id="idGenero" ref={generoRef} className="form-select" defaultValue="0">
                    <option value="0">Selecciona un genero</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Accion">Accion</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Puntuacion y boton */}
            <div className="col-12 col-md-8">
              <div className="card bg-warning p-3">
                <div className="mb-3">
                  <label className="form-label">¿Como puntuas tu pelicula?</label>
                  <div className="d-flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5].map((punt) => (
                      <div className="form-check" key={punt}>
                        <input className="form-check-input" type="radio" id={`punt${punt}`} name="puntuacion" value={punt} />
                        <label className="form-check-label" htmlFor={`punt${punt}`}>
                          {Array.from({ length: punt }, (_, i) => (
                            <i key={i} className="bi bi-star-fill star-gold me-1"></i>
                          ))}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary" onClick={agregarPelicula} type="button">
                    Registrar pelicula
                  </button>
                </div>
              </div>


          {/* Lista de peliculas */}
          <div className="row mt-4">
            <div className="col-12">
              <ul className="list-group">
                {peliculas.map((pelicula) => (
                  <PeliculaItem
                    key={pelicula.id}
                    pelicula={pelicula}
                    onEliminar={() => eliminarPelicula(pelicula.id)}
                    onEditar={() => editarPelicula(pelicula.id)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>

                    </div>
          </div>
      </Fragment>
  );
};

export default PeliculasFav;







