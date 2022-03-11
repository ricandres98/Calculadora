const numberElement = document.getElementsByClassName("number");
const screenInput = document.getElementById("input");
const clear = document.getElementById("clear");

function tecla(elementoHTML, valor) {
    this.elementoHTML = elementoHTML;
    this.valor = valor;
}

const teclasNumero = [];

for(let i = 0; i < 10; i++) {
    teclasNumero.push(new tecla(numberElement[i], i));
}
teclasNumero.push(new tecla(numberElement[10], '.'));

const teclasOperadores = [
    new tecla(document.getElementById("plus"), '+'),
    new tecla(document.getElementById("minus"), '-'),
    new tecla(document.getElementById("times"), 'x'),
    new tecla(document.getElementById("divided"), '/'),
];

const teclas = [...teclasNumero, ...teclasOperadores];

// for (item of teclasOperadores) {
//     item.elementoHTML.addEventListener('click', numberClicked(Event));
// }

let inputString = screenInput.innerHTML;

let valores = []
let operadores = []

document.addEventListener('click', () => {
    inputString = screenInput.innerHTML;
});
document.addEventListener('keyup', () => {
    inputString = screenInput.innerHTML;
    console.log(screenInput.innerHTML);
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
    valores = []
    operadores = []

    inputString = screenInput.innerHTML;
    let numberLength = String(parseInt(inputString)).length;
    if (inputString) {
        valores.push(parseInt(inputString));
        while (numberLength < inputString.length) {
            if(nextIsOperator) {
                operadores.push(inputString[numberLength]);
                numberLength++;
            }
            inputString = inputString.slice(numberLength);
            if(inputString.length < 1 && nextIsOperator){
                ;
            }else {
                valores.push(parseInt(inputString));
            }
            numberLength = String(parseInt(inputString)).length;
        }
        console.log(valores, operadores);
    } 
}

function realizarOperaciones() {
    let acum = valores[0];
    for(let i = 0; i < operadores.length; i++) {
        switch (operadores[i]) {
            case '+':
                acum += valores [i+1];
                console.log(acum);
                break;
            case '-':
                acum -= valores[i+1];
                console.log(acum);
                break;
            case 'x':
                acum *= valores[i+1];
                console.log(acum);
                break;
            case '/':
                acum /= valores[i+1];
                console.log(acum);
                break;
        }
    }
}

function startProcess(){
    readInput();
    realizarOperaciones();
}

function keyClicked(event) {
    for(key of teclas){
        if (key.elementoHTML === event.target){
            screenInput.innerHTML += key.valor;
        }
    }
}
function clearAll() {
    screenInput.innerHTML = '';
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
