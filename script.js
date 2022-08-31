const input = document.querySelector(".inputA");
const mensaje = document.querySelector(".mensaje");
const copiar = document.querySelector(".copiar");
const toast = document.getElementById('toast');
body = document.querySelector('body');
copiar.style.display = "none";

function encriptar() {
    if (validar()) {
        mostrar(procesar(input.value, 0, 1));
    }
}

function desencriptar() {
    if (validar()) {
        mostrar(procesar(input.value, 1, 0));
    }
}

function validar() {
    if (input.value == "") {
        notificar("rgba(113, 10, 10, 0.404)", '<i class="fa-solid fa-xmark"></i> El campo de texto no puede estar vacío', 2000);
        return false
    }
    return true
}

function procesar(cadena, val1, val2) {
    let letras = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    cadena = cadena.toLowerCase();

    for (let i = 0; i < letras.length; i++) {
        if (cadena.includes(letras[i][val1])) {
            cadena = cadena.replaceAll(letras[i][val1], letras[i][val2]);
        }
    }

    return cadena;
}

function mostrar(texto) {
    mensaje.value = texto
    mensaje.style.backgroundImage = "none";
    document.querySelector(".no-message").style.display = "none";
    document.querySelector(".instruccion").style.display = "none";
    copiar.style.display = "";
    input.value = "";
}

function copy() {
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value)
    mensaje.value = "";
    notificar("rgba(10, 56, 113, 0.404)", '<i class="fas fa-solid fa-clipboard-check"></i> Copiado al Portapaples', 3000);
    reiniciar();
}

function notificar(color, mensaje, tiempo) {
    toast.querySelector('.toast-body').style.backgroundColor = color;
    toast.querySelector('.toast-body').innerHTML = mensaje;
    toast.classList.add('visible');
    setTimeout(borrar, tiempo)
}

function borrar() {
    toast.classList.remove('visible')
}

function reiniciar() {
    mensaje.style.backgroundImage = "";
    document.querySelector(".no-message").style.display = "";
    document.querySelector(".instruccion").style.display = "";
    copiar.style.display = "none";
    input.value = ""
}

cargar();

function modoOscuro() {
    body.classList.toggle('darkmode');
    guardar(body.classList.contains('darkmode'));
}

function cargar() {
    const darkmode = localStorage.getItem('darkmode');

    if (!darkmode) {
        guardar('false');
    } else if (darkmode == 'true') {
        body.classList.add('darkmode');
    }

}

function guardar(value) {
    localStorage.setItem('darkmode', value)

}