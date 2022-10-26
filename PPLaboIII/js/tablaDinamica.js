

function crearCabecera(fila){
    const filaCabecera = document.createElement("thead")
    const tr = document.createElement("tr");
  
    for (const key in fila) {  
        if(key === "id") { 
            continue;
        }   
        const th = document.createElement("th"); 
        th.textContent = key;     
        tr.appendChild(th) ; 
    }

    filaCabecera.appendChild(tr);
    return filaCabecera;
}

function crearCuerpo(dataArray){
    const cuerpoTabla = document.createElement("tbody");

    dataArray.forEach(elemento => {
        const filaTabla = document.createElement("tr");
        for (const key in elemento) { 
            if(key === "id") { 
                filaTabla.setAttribute("data-id",elemento[key]);             
                continue;  
            }
            const td = document.createElement("td"); 
            td.textContent = elemento[key];     
            filaTabla.appendChild(td) ;                           
        }
        cuerpoTabla.appendChild(filaTabla);
    });

    return cuerpoTabla;
}

const $tabla = document.getElementById("divTabla");
const $spinner = document.querySelector(".spinner");

export function activarSpinner(){
    if($spinner.classList.contains("hidden"))
    {
        $spinner.classList.remove("hidden");
        $tabla.classList.add("hidden");
    }
         setTimeout(MostrarTabla,3000);
      
}

function MostrarTabla(){
    $spinner.classList.add("hidden");
    $tabla.classList.remove("hidden");
}

export function crearTabla(dataArray){ 
    if(!Array.isArray(dataArray))
    {
        return null;                    
    }
    const tablaCompleta = document.createElement("table");
    tablaCompleta.appendChild(crearCabecera(dataArray[0]));
    tablaCompleta.appendChild(crearCuerpo(dataArray));
    return tablaCompleta;
}