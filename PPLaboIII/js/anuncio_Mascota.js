import Anuncio from "./anuncio.js";

export class Anuncio_Mascota extends Anuncio{
    constructor(id,titulo,descripcion,tipo,precio,raza,fechaNacimiento,vacuna){
        super(id,titulo,descripcion,tipo,precio);
        this.raza = raza;
        this.fechaDeNacimiento = fechaNacimiento;
        this.vacuna = vacuna;
    }
}

export function crearAnuncio(infoAnimal)
{
    const anuncioNuevo = document.createElement("article");
    for (const key in infoAnimal) {  
        switch(key){
            case "titulo":
                const h2= document.createElement("h3");
                h2.textContent = infoAnimal[key];
                anuncioNuevo.appendChild(h2); 
                break;
            case "descripcion":
                const pDesc = document.createElement("p");
                pDesc.textContent= infoAnimal[key];
                anuncioNuevo.appendChild(pDesc); 
                break;
            case "precio":
                const pPrecio = document.createElement("p");
                pPrecio.setAttribute("id","p-precio");
                pPrecio.textContent= "$" + infoAnimal[key];
                anuncioNuevo.appendChild(pPrecio); 
                break;  
            case "raza":
                const pRaza = document.createElement("p");
                const imagenRaza = document.createElement("img");             
                imagenRaza.classList.add("icono");
                imagenRaza.setAttribute("src","./imagenes/burro.png");
                pRaza.textContent= infoAnimal[key];               
                pRaza.setAttribute("id","icono-p");
                imagenRaza.setAttribute("id","icono-p");
                imagenRaza.classList.add("icono");
                anuncioNuevo.appendChild(imagenRaza); 
                anuncioNuevo.appendChild(pRaza); 
                break;
            case "fechaDeNacimiento":
                const pFecha = document.createElement("p");
                const imagenFecha = document.createElement("img");
                imagenFecha.classList.add("icono");
                imagenFecha.setAttribute("src","./imagenes/oso-hormiguero.png");
                imagenFecha.setAttribute("id","icono-p");
                pFecha.textContent= infoAnimal[key];
                pFecha.setAttribute("id","icono-p");
                anuncioNuevo.appendChild(imagenFecha); 
                anuncioNuevo.appendChild(pFecha); 
                break;
            case "vacuna":
                const pVacuna = document.createElement("p");
                const imagenVacuna = document.createElement("img");
                imagenVacuna.classList.add("icono");
                imagenVacuna.setAttribute("src","./imagenes/vacuna.png");
                imagenVacuna.setAttribute("id","icono-p");
                pVacuna.textContent= infoAnimal[key];
                pVacuna.setAttribute("id","icono-p");
                anuncioNuevo.appendChild(imagenVacuna);
                anuncioNuevo.appendChild(pVacuna); 
                break;      
        }       
    }
    anuncioNuevo.classList.add("tarjetaAnimal");
    const botonVer = document.createElement("input");
    botonVer.setAttribute("value","Ver Mascota");
    botonVer.setAttribute("type","button");
    botonVer.setAttribute("onclick","window.location.href='#'");
    anuncioNuevo.appendChild(botonVer); 
    return anuncioNuevo;
}