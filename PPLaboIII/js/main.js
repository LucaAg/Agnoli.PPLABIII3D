import { crearTabla, activarSpinner } from "./tablaDinamica.js";
import  {Anuncio_Mascota}  from "./anuncio_Mascota.js";
import { validarCampoVacio, validarPrecio, validarIngresoVacio,validarCantidadCaracteres } from "./validaciones.js";

//localStorage.clear();
const $divTabla = document.querySelector("#divTabla");
const $animales = JSON.parse(localStorage.getItem("animales")) || [];
const $formAnimales = document.forms[0];
const $controlesValidar = $formAnimales.elements;

actualizarTabla();

mostrarBotones();

function mostrarBotones(){
    const {txtId} = $formAnimales;
    const $btnModificarAgregar = document.getElementById("btnAgregarModificar");
    const $btnEliminar = document.getElementById("btnEliminar");
    const $btnLimpiar = document.getElementById("btnLimpiar");
    if(txtId.value != "")
    {  
        $btnModificarAgregar.setAttribute("value","Modificar");   
        $btnLimpiar.classList.remove("hidden");
        $btnEliminar.classList.remove("hidden");   
    }
    else{
        $btnModificarAgregar.setAttribute("value","Agregar");        
        $btnEliminar.classList.add("hidden");
        $btnLimpiar.classList.add("hidden");
    }
}

document.addEventListener("click", (e)=>{
    if(e.target.matches("td"))
    {
        const emisor = e.target;
        let id = parseInt(emisor.parentElement.dataset.id); 
        const animal = $animales.find((animalBuscado) => animalBuscado.id === id); 
        if(animal !== undefined)
        {
            cargarFormulario(animal);
            mostrarBotones();
        }  
    }
    else if(e.target.matches("#btnEliminar"))
    {
        manejadorBorrarAnimal(parseInt($formAnimales.txtId.value));
        $formAnimales.reset();
        mostrarBotones();
    }
    else if(e.target.matches("#btnLimpiar")){
        Limpiar();
        mostrarBotones();
    }
});

function cargarFormulario(animal){
    const {txtId,txtTitulo,txtDescripcion,txtTipoAnimal,txtPrecio,txtRaza,txtFecha,txtVacuna} = $formAnimales;
    
    txtId.value = animal.id;
    txtTitulo.value = animal.titulo;
    txtDescripcion.value = animal.descripcion;
    txtTipoAnimal.value = animal.tipo;
    txtPrecio.value = animal.precio;
    txtRaza.value = animal.raza;
    txtFecha.value = animal.fechaDeNacimiento;
    txtVacuna.value = animal.vacuna;
}


$formAnimales.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("Submit");
    const {txtId,txtTitulo,txtDescripcion,txtTipoAnimal,txtPrecio,txtRaza,txtFecha,txtVacuna} = $formAnimales;

    if(validarIngresoVacio($controlesValidar))
    {
        const animalForm = new Anuncio_Mascota(parseInt(txtId.value),
        txtTitulo.value,
        txtDescripcion.value,
        txtTipoAnimal.value,
        parseFloat(txtPrecio.value),
        txtRaza.value,
        txtFecha.value,
        txtVacuna.value);

        if(animalForm !== null)
        {
            if(txtId.value === '')
            {
                animalForm.id = Date.now();
                manejadorCrearAnimal(animalForm);
            }
            else
            {
                manejadorActualizarAnimales(animalForm);
            }
        }   
        $formAnimales.reset();
        mostrarBotones();
    } 
});


const manejadorCrearAnimal = (nuevoAnimal)=>
{  
    $animales.push(nuevoAnimal);
    actualizarAlmacenamiento($animales);
}

const manejadorActualizarAnimales = (animalActualizado)=>
{   
    let indiceAnimal = $animales.findIndex((animalBuscado)=>{
        return animalBuscado.id === animalActualizado.id;
    });
    if(indiceAnimal >= 0 ){
        $animales[indiceAnimal] = animalActualizado;
    }
    actualizarAlmacenamiento($animales);
}

function manejadorBorrarAnimal (id)
{
    let indiceAnimal = $animales.findIndex((animalBuscado)=>{
        return animalBuscado.id === id;
    });
    $animales.splice(indiceAnimal,1);
    actualizarAlmacenamiento($animales);
};


function actualizarTabla ()
{
    limpiarTabla($divTabla);
    const datos = JSON.parse(localStorage.getItem("animales"));
    if(datos){
            datos.sort(function (a, b) {
            let tituloA = a.titulo;
            let tituloB = b.titulo;
            if(tituloA > tituloB)
            {
                return 1;
            }
            else if(tituloA < tituloB)
            {
                return -1;
            }
            return 0;
        });
        activarSpinner();
        $divTabla.appendChild(crearTabla(datos));
    }   
}

const actualizarAlmacenamiento = (datos) => {
    localStorage.setItem("animales",JSON.stringify(datos));
    actualizarTabla();  
};

function limpiarTabla(tabla)
{
    while(tabla.hasChildNodes())
    {
        tabla.removeChild(tabla.firstChild);
    }
}


function Limpiar(){
    $formAnimales.reset();
}



for(let i = 0; i < $controlesValidar.length; i++)
{
    const control = $controlesValidar[i];
    if(control.matches("input"))
    {
        control.addEventListener("blur", validarCampoVacio);
        if(control.matches("[type=text]"))
        {
            control.addEventListener("blur", validarCantidadCaracteres);
            if(control.classList.contains("precioVenta"))
            {            
                control.addEventListener("blur", validarPrecio);
            }
        }
    } 
}
