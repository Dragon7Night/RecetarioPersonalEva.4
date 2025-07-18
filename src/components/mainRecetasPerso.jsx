import { Fragment, useState, useRef, useEffect } from "react";
import RecetaItem from "./itemReceta.jsx";
import uuid4 from "uuid4";
import "../styles/style.css";

const RecetaPer = () => {
  const [recetas, setRecetas] = useState([]);

  // refs del formulario
  const tituloRef = useRef();
  const ingredientesRef = useRef();
  const pasosRef = useRef();

  const KEY = "recetas";
  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem(KEY));
    if (guardadas) {
      setRecetas(guardadas);
    }
  }, []);

  // Guardar en localStorage al cambiar recetas
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(recetas));
  }, [recetas]);

  const agregarReceta = () => {
    const tituloR = tituloRef.current.value.trim();
    const ingredienteR = ingredientesRef.current.value.trim();
    const pasosR = pasosRef.current.value.trim();

    // validacion en caso de no completar los campos
    if (!tituloR || !ingredienteR || !pasosR ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setRecetas((prevRecet) => {
      // Crear objeto recetas
      const newReceta = {
        id: uuid4(),
        titulo: tituloR,
        ingrediente: ingredienteR,
        pasos: pasosR
      };
      return [...prevRecet, newReceta];
    });
    
    // Limpia el formulario 
    tituloRef.current.value = "";
    ingredientesRef.current.value = "";
    pasosRef.current.value = "";
    
  };

  const eliminarReceta = (id) => {
    setRecetas((prevReceta) => prevReceta.filter((recet) => recet.id !== id));
  };

  const editarReceta = (id) => {
    const rece = recetas.find((recet) => recet.id === id);
    if (!rece) return;

    const newTitulo = prompt("Ingrese el nuevo título de la receta:", rece.titulo);
    if (!newTitulo) return;

    const newIngredi = prompt("Ingrese los nuevos ingredientes:", rece.ingrediente);
    if (!newIngredi) return;

    const newPasos = prompt("Ingrese nuevos pasos:", rece.pasos);
    if (!newPasos) return;


    setRecetas((prevReceta) =>
      prevReceta.map((datoRece) => {
        if (datoRece.id === id) {
          return {
            // cambia los valores
            ...datoRece,
            titulo: newTitulo,
            ingrediente: newIngredi,
            pasos: newPasos
          };
        } else {
          return datoRece; // no modifica nada
        }
      })
    );
  };

  return (
    <Fragment>
      <div className="container my-4">
        <h1 className="text-center bebas-neue-regular mb-4">¿Cuáles son tus recetas favorítas?</h1>

        <div className="row g-4 justify-content-center">

          {/* Formulario de completo */}
          <div className="col-12 col-md-8">
            <div className="card bg-warning p-3">

              {/* Titulo de la receta */}
              <div className="mb-3">
                <label htmlFor="idTitulo" className="form-label">Colócale un título a tu receta ✍️:</label>
                <input type="text" id="idTitulo" ref={tituloRef} className="form-control" placeholder="Ej. Tortilla de arroz" />
              </div>

              {/* Ingredientes de la receta */}
              <div className="mb-3">
                <label htmlFor="idIngredientes" className="form-label">Especifíque los ingredientes 🥕 🍎 🥛:</label>
                <textarea id="idIngredientes" ref={ingredientesRef} className="form-control" placeholder="Ej. Huevos - Aceite Arroz " rows="3" />
              </div>

              {/* Pasos de la receta */}
              <div className="mb-3">
                <label htmlFor="idPasos" className="form-label">Especifíque los pasos necesarios para la receta 🍽️:</label>
                <textarea id="idPasos" ref={pasosRef} className="form-control" placeholder="Ej. Cocer el arroz - Mezclar todo y freir con aceite" rows="3" />
              </div>

              {/* Boton de recetas */}
              <div className="d-grid">
                <button className="btn btn-primary" onClick={agregarReceta} type="button">Registrar receta</button>
              </div>
            </div>

            {/* Lista de recetas */}
            <div className="row mt-4">
              <div className="col-12">
                <ul className="list-group">
                  {recetas.map((receta) => (
                    <RecetaItem 
                    key={receta.id} 
                    recetas={receta} 
                    onEliminar={() => eliminarReceta(receta.id)} 
                    onEditar={() => editarReceta(receta.id)} 
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

export default RecetaPer;
