// Array para almacenar los productos en el carrito de compras
const carrito = [];

// Función para agregar un producto al array del carrito
function agregarProducto() {
    const producto = parseInt(prompt("Elige el producto que deseas comprar:\n1. Poleras valor: $ 5.000\n2. Zapatillas valor: $ 10.000\n3. Pantalones valor: $ 8.000\n4. Shorts  valor: $ 4.000"));
    const cantidad = parseInt(prompt("Ingresa la cantidad que deseas"));
    let precioFinal = cantidad;

    switch (producto) {
        case 1:
            precioFinal = cantidad * 5000;
            break;
        case 2:
            precioFinal = cantidad * 10000;
            break;
        case 3:
            precioFinal = cantidad * 8000;
            break;
        case 4:
            precioFinal = cantidad * 4000;
            break;
        default:
            alert("Opción inválida. Por favor, ingrese un número válido.");
            return;
    }

    const productoSeleccionado = {//creacion de objeto
        nombre: "",
        precio: precioFinal,
        cantidad: cantidad
    };
    
    switch (producto) {//creacion de switch para el nombre del producto que elija el usuario
        case 1:
            productoSeleccionado.nombre = "Poleras";
            break;
        case 2:
            productoSeleccionado.nombre = "Zapatillas";
            break;
        case 3:
            productoSeleccionado.nombre = "Pantalones";
            break;
        case 4:
            productoSeleccionado.nombre = "Shorts";
            break;
        default:
            productoSeleccionado.nombre = "Producto no especificado";
            break;
    }

    carrito.push(productoSeleccionado);
    alert("Producto agregado al carrito: \n" + " " + productoSeleccionado.nombre + " \n Cantidad: " + productoSeleccionado.cantidad + "\n Total a pagar: $" + productoSeleccionado.precio);
}

function devolverProducto() {
    alert("Deberá ingresar sus datos para coordinar la devolución del producto");

    const nombre = prompt("Ingrese su nombre completo");
    const telefono = prompt("Ingrese su teléfono");

    alert("Estimad@ " + nombre + "\nPronto uno de nuestros ejecutivos se contactará con usted, al numero de telefono " + telefono + " para coordinar la devolución del producto.\n Muchas gracias");
}

function mostrarCarrito() {
    var preciosTotales = {};
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        if (preciosTotales[producto.nombre]) {
            preciosTotales[producto.nombre] += producto.precio * producto.cantidad;
        } else {
            preciosTotales[producto.nombre] = producto.precio * producto.cantidad;
        }
    }
    var total = 0;
    var mensaje = "Productos en el carrito:\n";
    for (var nombre in preciosTotales) {
        var precioTotal = preciosTotales[nombre];
        mensaje += nombre + ": " + precioTotal.toFixed(2) + "\n";
        total += precioTotal;
    }
    mensaje += "\nPrecio total: " + total.toFixed(2);
    alert(mensaje);
}

function pagar() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
    } else {
        alert("Pago exitoso.\n Muchas gracias por su compra.");
        carrito.length = 0; // vacia el carrito para cerrar el programa
        return;
    }
}

function ingresar() {
    let opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Comprar Producto\n2- Devolver Producto\n3- Ver Carrito\n4- Pagar\n5- Salir"));

    while (opcion !== 5) {
        switch (opcion) {
            case 1:
                agregarProducto();
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Comprar Producto\n2- Devolver Producto\n3- Ver Carrito\n4- Pagar\n5- Salir"));
                break;
            case 2:
                devolverProducto();
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Comprar Producto\n2- Devolver Producto\n3- Ver Carrito\n4- Pagar\n5- Salir"));
                break;
            case 3:
                mostrarCarrito();
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Comprar Producto\n2- Devolver Producto\n3- Ver Carrito\n4- Pagar\n5- Salir"));
                break;
            case 4:
                pagar();
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Comprar Producto\n2- Devolver Producto\n3- Ver Carrito\n4- Pagar\n5- Salir"));
                break;
            default:
                alert("Opción inválida. Por favor, ingrese un número válido.");
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Comprar Producto\n2- Devolver Producto\n3- Ver Carrito\n4- Pagar\n5- Salir"));
                break;
        }
    }
}