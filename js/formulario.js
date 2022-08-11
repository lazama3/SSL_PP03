const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	edad: /^([0-9]|[1-9][0-9]|1[0-1][0-9]|120)$/,
	fecha_nacimiento: /^(0[1-9]|[12][0-9]|3[01])+[\/]+(0[1-9]|1[012])+[\/]+\d{4}$/, 
 	dni: /^\d{8}$/,
	cuit: /^(\d{2})+[\-]+(\d{8})+[\-]+(\d{1})$/,
	cbu: /^\d{22}$/,
	sexo:  /^[F,M,I]{1}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ 
}

const campos = {
	nombre: false,
	apellido: false,
	edad: false,
	fecha_nacimiento: false,
	dni: false,
	cuit: false,
	cbu: false,
	sexo: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	 //accedo al name que le puse en el formulario
	switch (e.target.name) {
		case "nombre": //cuando el name del form es nombre: ...
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
			break;
		case "edad":
			validarCampo(expresiones.edad, e.target, 'edad');
			break;
		case "fecha_nacimiento":
			validarCampo(expresiones.fecha_nacimiento, e.target, 'fecha_nacimiento');
			break;
		case "dni":
			validarCampo(expresiones.dni, e.target, 'dni');
			break;
		case "cuit":
			validarCampo(expresiones.cuit, e.target, 'cuit');
			break;
		case "cbu":
			validarCampo(expresiones.cbu, e.target, 'cbu');
			break;
		case "sexo":
			validarCampo(expresiones.sexo, e.target, 'sexo');
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => { //por cada input agrego una funcion en este caso validar formulario
	input.addEventListener('keyup', validarFormulario); //cuando se levanta la tecla
	input.addEventListener('blur', validarFormulario); //cuando le hacen click afueta del input
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault(); //para que el boton enviar no me cabie la url

	if (campos.nombre && campos.apellido && campos.dni && campos.edad && campos.fecha_nacimiento && campos.cuit 
		&& campos.cbu && campos.sexo && campos.correo && campos.telefono) {
			
		formulario.reset();
		
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});