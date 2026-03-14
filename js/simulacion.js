const cantidad = document.getElementById("intentos");
const contenedorSimulaciones = document.getElementById("contenedorSimulaciones");
const textoGanados = document.getElementById("textoGanados");
const textoTotales = document.getElementById("textoTotales");
const textoProbabilidad = document.getElementById("textoProbabilidad");

const btn = document.getElementById("btnStart");
btn.addEventListener('click', ()=>{ iniciarSimulacion() });

function dibujarSimulacion({auto = 0, abierta = 0, seleccionada = 0, seleccionFinal = 0, intentoNumero = 0, ganado = false}){
    const contenedorGeneral = document.createElement("div");
    contenedorGeneral.classList.add("contenedor-general");
    contenedorGeneral.classList.add(ganado?"ganado":"perdido");

    const titulo = document.createElement("h3");
    titulo.textContent = `Intento Número ${intentoNumero}`;
    
    const intento = document.createElement("div");
    intento.classList.add("intento");

    for(let i = 0; i < 3; i++){
        const puerta = document.createElement("div");
        puerta.classList.add("puerta");
        if(i === abierta) puerta.classList.add("abierta");
        else if(i === seleccionada) puerta.classList.add("seleccionada");
        else if(i === seleccionFinal) puerta.classList.add("final");

        const imgPuerta = document.createElement("img");
        imgPuerta.classList.add("imgPuerta");
        imgPuerta.src = "./../img/images.png";

        const imgContenido = document.createElement("img");
        imgContenido.classList.add("imgContenido");
        imgContenido.src = `./../img/${i === auto?"auto":"cabra"}.png`;

        puerta.appendChild(imgPuerta);
        puerta.appendChild(imgContenido);

        intento.appendChild(puerta);
    }

    contenedorGeneral.appendChild(titulo);
    contenedorGeneral.appendChild(intento);
    contenedorSimulaciones.appendChild(contenedorGeneral);
}

function crearSimulacion(cantidad = 100){
    let ganados = 0;

    for(let i = 0; i < cantidad; i++){
        const auto = randomInt(0, 2);
        const seleccionada = randomInt(0, 2);
        
        const cabras = [];
        for(let i = 0; i < 3; i++){
            if(i !== auto && i != seleccionada) cabras.push(i);
        }
        
        const abierta = randomChoice(cabras);
        const seleccionFinal = ([0, 1, 2].filter(x => x !== abierta && x !== seleccionada))[0];
        const ganado = auto === seleccionFinal;
        if(ganado) ganados++;
        
        console.log({auto, seleccionada, seleccionFinal, intentoNumero: i+1, ganado});
        dibujarSimulacion({auto, abierta, seleccionada, seleccionFinal, intentoNumero: i+1, ganado});    
    }

    return ganados;
}

function iniciarSimulacion(){    
    const valorCantidad = parseInt(cantidad.value);
    
    if(!(valorCantidad !== NaN) || valorCantidad < 1 || valorCantidad > 10000){
        alert("Debe ingresar un valor válido en el campo (números entre el 1 y 10000)");
        return;
    }

    console.log("Simulación Iniciada");
    console.log(`Cantidad de Simulaciones: ${valorCantidad}`);
    
    btn.disabled = true;
    contenedorSimulaciones.innerHTML = "";
    ganados = crearSimulacion(valorCantidad);

    imprimirResultados(ganados, valorCantidad)
    btn.disabled = false;

    console.log("Simulación Terminada");
}

function imprimirResultados(ganados, totalIntentos){
    const textoG = `Casos Ganados: ${ganados}`;
    const textoT = `Casos Totales: ${totalIntentos}`;
    const textoP = `Probabilidad: ${ganados/totalIntentos} = ${(ganados/totalIntentos)*100}%`;

    console.log(`${textoG}\n${textoT}\n${textoP}`);

    textoGanados.textContent = textoG;
    textoTotales.textContent = textoT;
    textoProbabilidad.textContent = textoP;
}

function randomChoice(opciones){
    return opciones[Math.floor(Math.random() * opciones.length)];
}

function randomInt(min = 0, max = 0){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}