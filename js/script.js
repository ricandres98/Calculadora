const numberElement = document.getElementsByClassName("number");
const screenInput = document.getElementById("input");
const clear = document.getElementById("clear");

function numero(elementoHTML, valor) {
    this.elementoHTML = elementoHTML;
    this.valor = valor;
}

function numberClicked(event){
    for(tecla of teclasNumero){
        if (tecla.elementoHTML === event.target){
            screenInput.innerHTML += tecla.valor;
        }
    }
}
function clearAll() {
    screenInput.innerHTML = '';
}
function erase() {
    let array = []
    let provisional;
    for(let i = 0; i < screenInput.innerHTML.length; i++) {
        array.push(screenInput.innerHTML[i]);
    }
    array.pop();
    screenInput.innerHTML = '';
    for(item of array) {
        screenInput.innerHTML += item;
    }
}

const teclasNumero = [];

for(let i = 0; i < 10; i++) {
    teclasNumero.push(new numero(numberElement[i], i));
}
teclasNumero.push(new numero(numberElement[10], '.'))

