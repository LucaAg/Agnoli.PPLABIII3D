import  {crearAnuncio }  from "./anuncio_Mascota.js";

const $divAnuncio = document.querySelector("#divAnuncio");
const $animales = JSON.parse(localStorage.getItem("animales")) || [];


$animales.forEach(animal => {
    const articuloAnuncio = crearAnuncio(animal);
    $divAnuncio.appendChild(articuloAnuncio);
});