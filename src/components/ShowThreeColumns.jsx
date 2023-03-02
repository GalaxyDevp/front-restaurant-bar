import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowRestaurantsDetails from "./ShowRestaurantsDetails";
import "../styles/Styles.css";

const endPoint = "http://localhost:8000/api";
const urlImg = "https://api-onow.oasishoteles.net"
let dataRestaurant = [];
let JSONRestaurants = [];
let dataBar = [];
let JSONBars = [];
let dataDetails = [];
let horarioRestaurantInicio;
let horarioRestaurantFinal;
let horarioBarInicio;
let horarioBarFinal;
let formatInicioRes = [];
let formatInicioBar = [];
let formatFinRes = [];
let formatFinBar = [];
const ShowThreeColumns = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getAllRestaurants();
  }, []);
  const [bares, setBares] = useState([]);
  useEffect(() => {}, []);
  const [details, setDetails] = useState([]);
  useEffect(() => {}, []);
  const getAllRestaurants = async () => {
    const response = await axios.get(`${endPoint}/centrosConsumo`);
    const responseHorarios = await axios.get(
      `${endPoint}/centrosConsumoHorarios`
    );

    response.data.forEach(function (restaurant) {
      if (restaurant.categoria_id === 2) {
        responseHorarios.data.forEach(function (horario) {
          if (horario.centro_consumo_id === restaurant.id) {         
            formatInicioRes = horario.hora_inicio.split(":")
            horarioRestaurantInicio = tConv24(formatInicioRes[0]+":"+formatInicioRes[1])
            formatFinRes = horario.hora_final.split(":")
            horarioRestaurantFinal = tConv24(formatFinRes[0]+":"+formatFinRes[1])
            console.log(formatFinRes, 'res inicio')
            console.log(horarioRestaurantInicio, 'res inicio')
          }
        });
        JSONRestaurants = {
          id: restaurant.id,
          nombre: restaurant.nombre,
          concepto_es: restaurant.concepto_es,
          concepto_en: restaurant.concepto_en,
          logo: restaurant.logo,
          img_portada: restaurant.img_portada,
          categoria_id: restaurant.categoria_id,
          hora_inicio: horarioRestaurantInicio,
          hora_final: horarioRestaurantFinal,
        };
        dataRestaurant.push(JSONRestaurants);
      } else if (restaurant.categoria_id === 3) {
        responseHorarios.data.forEach(function (horario) {
          if (horario.centro_consumo_id === restaurant.id) {
            formatInicioBar = horario.hora_inicio.split(":")
            horarioBarInicio = tConv24(formatInicioBar[0]+":"+formatInicioBar[1])
            formatFinBar = horario.hora_final.split(":")
            horarioBarFinal = tConv24(formatFinBar[0]+":"+formatFinBar[1])
          }
        });
        JSONBars = {
          id: restaurant.id,
          nombre: restaurant.nombre,
          concepto_es: restaurant.concepto_es,
          concepto_en: restaurant.concepto_en,
          logo: restaurant.logo,
          img_portada: restaurant.img_portada,
          categoria_id: restaurant.categoria_id,
          hora_inicio: horarioBarInicio,
          hora_final: horarioBarFinal,
        };
        dataBar.push(JSONBars);
      }
    });

    setRestaurants(dataRestaurant)
    setBares(dataBar);
    console.log(dataBar)
  };
  const ShowDetails = async (id) => {
    const response = await axios.get(`${endPoint}/centrosConsumo/${id}`);
    const responseHorarios = await axios.get(
      `${endPoint}/centrosConsumoHorarios`
    );
    const imgPortada = urlImg +'/'+response.data.img_portada
    const imgLogo = urlImg +'/'+response.data.logo
    responseHorarios.data.forEach(function (horario) {
      if (horario.centro_consumo_id === response.data.id) {
        formatInicioRes = horario.hora_inicio.split(":")
        horarioRestaurantInicio = tConv24(formatInicioRes[0]+":"+formatInicioRes[1])
        formatFinRes = horario.hora_final.split(":")
        horarioRestaurantFinal = tConv24(formatFinRes[0]+":"+formatFinRes[1])
      }
    });

    dataDetails = {
      id: response.data.id,
      nombre: response.data.nombre,
      concepto_es: response.data.concepto_es,
      concepto_en: response.data.concepto_en,
      logo: imgLogo,
      img_portada: imgPortada,
      categoria_id: response.data.categoria_id,
      hora_inicio: horarioRestaurantInicio,
      hora_final: horarioRestaurantFinal,
    };
    setDetails(dataDetails)

  };
  function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4 className="title">Restaurantes</h4>
          <hr className="hr m-2" />
          {restaurants.map((restaurant) => (
            <div className="container section-restaurant divider-black">
              <div className="row">
                <div className="col-6">
                  <div>
                    <span className="subtitle">{restaurant.nombre}</span>
                  </div>
                  <div>
                    <span className="selection-span-color">
                      {restaurant.concepto_es}
                    </span>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <span className="subtitle">Abierto Hoy</span>
                    <br></br>
                    <span>
                      {restaurant.hora_inicio} - {restaurant.hora_final}
                    </span>
                  </div>
                  <div className="col-6 d-flex justify-content-end pb-0 ">
                    <button
                      onClick={() => ShowDetails(restaurant.id)}
                      className="btn btn-outline-dark btn-lg"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col background-color-bar">
          <div className="span-text-color">
            <h4 className="title">Bares</h4>
            <div className="divider-white"></div>
            {bares.map((bar) => (
              <div className="container section-restaurant divider-white">
                <div className="row">
                  <div className="col-6">
                    <div>
                      <span className="subtitle">{bar.nombre}</span>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <span className="subtitle">Abierto Hoy</span>
                      <br></br>
                      <span>
                        {bar.hora_inicio} - {bar.hora_final}
                      </span>
                    </div>
                    <div className="col-6 d-flex justify-content-end pb-0 ">
                      <button
                        onClick={() => ShowDetails(bar.id)}
                        className="btn btn-outline-light btn-lg"
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
            ))}
            <hr className="hr m-2"/>
          </div>
        </div>
        <div className="col background-color-details">
        <ShowRestaurantsDetails details={details}/>
        </div>
      </div>
    </div>
  );
};

export default ShowThreeColumns;
