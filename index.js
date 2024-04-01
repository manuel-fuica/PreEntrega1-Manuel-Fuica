//----simulador de compra
function ingresar(){

let opcion = parseInt(prompt("Eliga la opcion de que desea realizar:\n 1- Comprar Producto\n 2- Devolver Producto\n 3- Salir"));

while(opcion !== 0) {

    switch(opcion){
        case 1:
            comprarProducto();
            break;

        case 2:
            devolverProducto();
            break;

        case 3:
            alert("Gracias por visitarnos");
            break;

        case 4:
            default:
            alert("ingrese una opcion valida");
            break;
    }

    return;
};


function comprarProducto(){

    const producto = parseInt(prompt("eliga el producto que desea comprar:\n 1- Poleras $5000\n 2- Zapatilas $10000 \n 3- Pantalones $8000\n 4- shorts $4000"));

    const cantidad = parseInt(prompt("ingrese la cantidad que desea"));
    let precioFinal = cantidad
    

    if (producto === 1){
        precioFinal = cantidad * 5000;
    }else if (producto == 2){
        precioFinal = cantidad * 10000;
    }else if (producto == 3){
        precioFinal = cantidad * 8000;
    }else if (producto == 4) {
        precioFinal = cantidad * 4000;
    }

    alert("El precio final a pagar es: $ " + precioFinal + " Pesos");
}


function devolverProducto(){
    alert("Debera ingresar sus datos para coordinar la devolucion del producto")

    const nombre = prompt("ingrese su nombre completo")
    const telefono = prompt("ingrese su telefono")

    alert("Estimad@ " + nombre + "\nPronto uno de nuestros ejecutivos se contactara con ud para coordinar la devolucion del producto\n Muchas gracias");
};

};




