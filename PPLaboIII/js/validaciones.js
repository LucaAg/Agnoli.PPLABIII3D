export function validarCampoVacio(e) {
  const input = e.target;
  let todoOk = true;
  const valorInput = input.value.trim();
  if (!valorInput) {
    crearMensajeError(input);
    todoOk = false;
  } else {
    ocultarMensajeError(input);
    todoOk = true;
  }
  return todoOk;
}

export function validarPrecio(e) {
  const input = e.target;
  const valorInput = input.value.trim();
  const valoresAceptados = /^[0-9]+$/;
  let numero = 50000;
  if(validarCampoVacio(e))
  {
    if (!valorInput.match(valoresAceptados)) 
    {
      crearMensajeError(
        input, `*Solo se aceptan numeros`);   
    }
    else
    {
      ocultarMensajeError(input);
      if(validarNumerosNegativos(valorInput))
      {
        crearMensajeError(
          input,`*no se admiten numeros negativos!`);
      }
      else
      {
        ocultarMensajeError(input);
        if (valorInput > numero) 
        {
          crearMensajeError(
            input,`*Error, el valor precio maximo permitido es ${numero}`);
        } 
        else 
        {
          ocultarMensajeError(input);
        }
      }
    }
  }
  
}

function validarNumerosNegativos(numero)
{
  let todoOk = true;
  if(numero > 0){
    todoOk = false;
  }
  return todoOk;
}

export function validarCantidadCaracteres(e) {
  const input = e.target;
  const valorInput = input.value.trim();
  if (!valorInput) {
    crearMensajeError(input);
  } else {
    ocultarMensajeError(input);
    if (valorInput.length > 25) {
      crearMensajeError(
        input,
        `*Error, el maximo de caracteres permitido es 25`
      );
    } else {
      ocultarMensajeError(input);
    }
  }
}

export function validarIngresoVacio(controles) {
  let todoOk = true;
  for (let i = 0; i < controles.length; i++) {
    const controlValidar = controles[i];
    if (
      controlValidar.matches("input") &&
      !controlValidar.classList.contains("hidden")
    ) {
      if (
        (controlValidar.matches("[type=text]") ||
          controlValidar.matches("[type=number]")) &&
        controlValidar.value.trim() == ""
      ) {
        crearMensajeError(controlValidar);
        todoOk = false;
      }
    }
  }
  return todoOk;
}

function crearMensajeError(input, mensaje) {
  const $small = input.nextElementSibling;
  if ($small) {
    const $nombreInput = input.name.slice(3);
    $small.textContent = mensaje || `*${$nombreInput} es requerido`;
  }
}

function ocultarMensajeError(input) {
  const $small = input.nextElementSibling;
  if ($small) {
    $small.textContent = "";
  }
}
