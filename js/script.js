const numberElement = document.getElementsByClassName("number");
const screenInput = document.getElementById("input");
const screenOutput = document.getElementById("output");
const clear = document.getElementById("clear");


function tecla(elementoHTML, valor) {
    this.elementoHTML = elementoHTML;
    this.valor = valor;
}

const teclasNumero = [];
let valores = [];
let operadores = [];
let ans = 0;
let encadenado = false;

for(let i = 0; i < 10; i++) {
    teclasNumero.push(new tecla(numberElement[i], i));
}
teclasNumero.push(new tecla(numberElement[10], '.'));

const teclasOperadores = [
    new tecla(document.getElementById("plus"), '+'),
    new tecla(document.getElementById("minus"), '-'),
    new tecla(document.getElementById("times"), '*'),
    new tecla(document.getElementById("divided"), '/'),
];

const teclas = [...teclasNumero, ...teclasOperadores];

let inputString = screenInput.innerHTML;

document.addEventListener('click', () => {
    inputString = screenInput.innerHTML;
});

document.addEventListener('keyup', (event) => {
    inputString = screenInput.innerHTML;
    
    console.log(event);
    switch (event.key){
        case 'Enter':
            startProcess();
            break;
        case 'Backspace':
            erase();
            break;
        case 'Escape':
        case 'Delete':
            clearAll();
            break;
        default:
            for (keys of teclas) {
                if(encadenado){
                    for (signo of teclasOperadores) {
                        if (event.key === signo.valor) {
                            screenInput.innerHTML = ans;
                            encadenado = false;
                        }
                    }
                    for (numero of teclasNumero) {
                        if (event.key == numero.valor) {
                            screenInput.innerHTML = '';
                            encadenado = false;
                        }
                    }
                }
                if(event.key == keys.valor){
                    screenInput.innerHTML += event.key;
                    break;
                }
            }
    } 
});

function nextIsOperator(){
    let hayOperador;
    for(item of teclasOperadores) {
        hayOperador = inputString.includes(item.valor);
        if (hayOperador){
            break;
        }
    }
    return hayOperador;
}

function readInput(){
    valores = []; 
    operadores = [];

    inputString = screenInput.innerHTML;
    let numberLength = String(parseFloat(inputString)).length;
    if (inputString) {
        valores.push(parseFloat(inputString));
        while (numberLength < inputString.length) {
            if(nextIsOperator) {
                operadores.push(inputString[numberLength]);
                numberLength++;
            }
            inputString = inputString.slice(numberLength);
            if(inputString.length < 1 && nextIsOperator){
                ;
            }else {
                valores.push(parseFloat(inputString));
            }
            numberLength = String(parseFloat(inputString)).length;
        }
        console.log(valores, operadores);
    } 
}

function realizarOperaciones() {
    const isMultOrDiv = operadores.includes('*') || operadores.includes('/');
    //Se encarga primero de resolver multiplicaciones y divisiones
    if(isMultOrDiv) {
        for(let i = 0; i < operadores.length; i++) {
            switch (operadores[i]) {
                case '*':
                    valores[i] = valores[i] * valores[i+1];
                    //Toma los valores que han sido multiplicados y los sustituye por su resultado,
                    //corriendo todo el array una posición y eliminando el elemento final para acortarlo
                    // Ej:2+3*8-6*10: [2,3,8,6,10] => [2,24,6,10]
                    //                   ^ ^             ^
                    for (let j = i; j < valores.length - 2; j++) {
                        valores[j+1] = valores [j + 2];
                    }
                    valores.pop();
                    //Elimina del array de operadores el signo de la operación de multiplicación  
                    //o división ya realizada y corre los valores del array un espacio
                    // ['+','*','-','*'] => ['+','-','*']
                    //       ^
                    for (let j = i; j < operadores.length - 1; j++) {
                        operadores[j] = operadores[j + 1];
                    }
                    operadores.pop();
                    //Retrocede el valor de i en una unidad para volver a verificar la misma posición
                    //en caso de que al correr los valores haya quedado en esta un '*' o  un'/'
                    i--;
                    console.log(valores, operadores);
                    break;
                case '/':
                    if(valores[i+1] === 0) {
                        return 'ERROR';
                    } else {
                        valores[i] = valores[i] / valores[i+1];
                        // Ver comentarios arriba
                        for (j = i; j < valores.length - 2; j++) {
                            valores[i+1] = valores [i+2];
                        }
                        valores.pop();
                        for (let j = i; j < operadores.length - 1; j++) {
                            operadores[j] = operadores[j + 1];
                        }
                        operadores.pop();
                        i--;
                    }
                    console.log(valores, operadores);
                    break;
            }
        }
    }
    ans = valores[0];
    for(let i = 0; i < operadores.length; i++) {
        switch (operadores[i]) {
            case '+':
                ans += valores [i+1];
                console.log(ans);
                break;
            case '-':
                ans -= valores[i+1];
                console.log(ans);
                break;
            default: 
                console.log('Se pasó una multiplicación o división sin resolver');
        }
    }
    if (typeof(ans) === 'number') {
        encadenado = true;
    }
    // Esta forma de mandar el resultado permite redondear el resultado a 5 cifras decimales 
    // para evitar las imprecisiones causadas por trabajar decimales en binario.
    return Number(ans.toFixed(5));
}

function printResult() {
    if(typeof(realizarOperaciones()) === 'number') {
        screenInput.style.fontStyle = 'italic';
        screenOutput.style.display = 'grid';
        screenOutput.innerHTML = realizarOperaciones();
    } else if (realizarOperaciones() == 'ERROR'){
        screenOutput.style.display = 'grid';
        screenOutput.innerHTML = 'No se puede dividir entre 0';
    }
}

function startProcess(){
    readInput();
    const resultado = realizarOperaciones();
    console.log(`El resultado es ${resultado}`);
    printResult();
}

function keyClicked(event) {
    for(key of teclas){
        for (signo of teclasOperadores) {
            if (encadenado && event.target === signo.elementoHTML) {
                screenInput.innerHTML = ans;
                encadenado = false;
            }
        }
        for (signo of teclasNumero) {
            if (encadenado && event.target === signo.elementoHTML) {
                screenInput.innerHTML = '';
                encadenado = false;
            }
        }
        if (key.elementoHTML === event.target){
            screenInput.innerHTML += key.valor;
        }
    }
}
function clearAll() {
    screenInput.innerHTML = '';
    screenInput.style.fontStyle = 'normal';
    screenOutput.style.display = 'none';
    encadenado = false;
}
function erase() {
    let array = [];
    for(let i = 0; i < screenInput.innerHTML.length; i++) {
        array.push(screenInput.innerHTML[i]);
    }
    array.pop();
    screenInput.innerHTML = '';
    for(item of array) {
        screenInput.innerHTML += item;
    }
}