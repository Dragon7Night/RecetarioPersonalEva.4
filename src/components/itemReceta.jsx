
import { Fragment } from "react";

const RecetaItem = ({ recetas, onEditar, onEliminar }) => {
  const { titulo, ingrediente, pasos} = recetas;

  return (
    <Fragment>
      <li className="list-group-item list-group-item-action  list-group-item-warning d-flex justify-content-between align-items-center">

        <div>
          <div> <strong>Título:</strong> {titulo}</div>
          <div> <strong>Ingredientes:</strong> {ingrediente} </div>
          <div> <strong>Pasos:</strong> {pasos}</div>
        </div>

        <div>
          <i className="bi bi-pencil-square btn-edit icon-wi mx-1" onClick={onEditar}></i>
          <i className="bi bi-trash3-fill btn-delete icon-wi" onClick={onEliminar}></i>
        </div>
      </li>
    </Fragment>
  );
};

export default RecetaItem;

