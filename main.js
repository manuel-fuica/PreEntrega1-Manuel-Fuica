// Array para almacenar los productos en el carrito
const carrito = [];

// Función para agregar un producto al array de carrito
function agregarProducto() {
    const producto = parseInt(prompt("Elige el producto que deseas comprar:\n1. Poleras ($5000)\n2. Zapatillas ($10000)\n3. Pantalones ($8000)\n4. Shorts ($4000)"));
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

    const productoSeleccionado = {
        nombre: "",
        precio: precioFinal,
        cantidad: cantidad
    };
    
    switch (producto) {
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
    alert("Producto agregado al carrito: " + productoSeleccionado.nombre + " - Precio: $" + productoSeleccionado.precio + " - Cantidad: " + productoSeleccionado.cantidad);
}

function devolverProducto() {
    alert("Deberá ingresar sus datos para coordinar la devolución del producto");

    const nombre = prompt("Ingrese su nombre completo");
    const telefono = prompt("Ingrese su teléfono");

    alert("Estimad@ " + nombre + "\nPronto uno de nuestros ejecutivos se contactará con usted para coordinar la devolución del producto. Muchas gracias");
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let total = 0;
        let mensaje = "Productos en el carrito:\n";
        carrito.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}\n`;
            total += producto.precio * producto.cantidad;
        });
        mensaje += `Total a pagar: $${total}`;
        alert(mensaje);
    }
}

function pagar() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
    } else {
        alert("Pago exitoso. Muchas gracias por su compra.");
        carrito.length = 0; // Vaciar el carrito después de pagar
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