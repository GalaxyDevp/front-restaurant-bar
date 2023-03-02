import "../styles/Styles.css";
import React from "react";

const ShowRestaurantsDetails = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div className="row p-3">
            <span className="span-subtitle">
              {props.details.logo ? "Logo" : ""}
            </span>
            <img src={props.details.logo} alt=""></img>
          </div>
        </div>
        <div className="row">
          <span className="span-subtitle">
            {props.details.img_portada ? "Portada" : ""}
          </span>
          <img className="img" src={props.details.img_portada} alt=""></img>
        </div>
      </div>
      <div className="row">
        <div className="col m-4 p-4 ">
          <span className="span-subtitle">{props.details.nombre}</span>
          <p className="p-subtitle">{props.details.concepto_es}</p>
        </div>
        <div className="col m-4 p-4">
          <span className="span-subtitle">
            {props.details.hora_inicio ? "Abierto Hoy" : ""}
          </span>
          <p className="p-subtitle">
            {props.details.hora_inicio}{" "}
            {props.details.hora_inicio && props.details.hora_final ? "-" : ""}{" "}
            {props.details.hora_final}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowRestaurantsDetails;
