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