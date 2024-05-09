
class Producto {//creo la clase producto, la cual recibiar al crear un nuevo producto el nombre y precio
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen
    }
}

//funciones

function obtenerProductosLS() {
    const productosLS = JSON.parse(localStorage.getItem("productos"));//obtiene los productos del LS y los convierte en un array de objetos

    if(productosLS){//si el array tiene elementos los pasa al carrito
        carrito = productosLS;
    }

    renderizarCarrito(carrito);//renderiza el carrito y le pasa los elementos del carrito
}

function guardarProdcutosLS() {
    
    const json = JSON.stringify(carrito);//crea un json con los objetos del carrito
    localStorage.setItem("productos", json);//guarda el json en el LS, lo guarda con la clave producto valor json con los objetos
}

function renderizarCarrito(carrito) {
    tbodyCarrito.innerHTML = ""; // Limpia la tabla

    for (const productoCarrito of carrito) {
        const tr = document.createElement("tr"); // Crea una nueva etiqueta tr
        tr.innerHTML = `
            <td>${productoCarrito.nombre}</td>
            <td>$ ${productoCarrito.precio}</td>
            <td>${productoCarrito.cantidad}</td>
            <td>$ ${productoCarrito.precio * productoCarrito.cantidad}</td>
        `;

        const botonBorrar = document.createElement("svg");//creo un elemento svg
        botonBorrar.className = "imagenBasurero";//le paso la clase imagenBasurero
        botonBorrar.insertAdjacentHTML(
        "beforeend",
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>`
        );

        botonBorrar.addEventListener("click", () => {
            eliminarDelCarrito(productoCarrito);
        })

        tr.append(botonBorrar);

        tbodyCarrito.append(tr);
    }
}

function eliminarDelCarrito(productoCarrito) {
    const indiceProductoCarrito = carrito.findIndex((el) => {
        return el.nombre === productoCarrito.nombre;
    });

    carrito.splice(indiceProductoCarrito, 1);

    renderizarCarrito(carrito);
    guardarProdcutosLS();

    }


function agregarProducto(producto, cantidad) {//funcion para agregar al carrito recibe el nombre y la cantidad

    const indiceProductoCarrito = carrito.findIndex(//busca el indice del producto en el carrito y devuelve -1 si no existe el producto
        (el =>{return el.nombre === producto.nombre}));

        if(indiceProductoCarrito === -1) {/*si el indice es -1 no existe el producto en el carrito*/
            carrito.push({//metodo push para agregarlo al carrito si no existe
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad
            })
        } else{
            carrito[indiceProductoCarrito].cantidad += cantidad// si existe modifico la cantidad
        }

        renderizarCarrito(carrito);//al agregar un producto al final llama a la funcion renderizar carrito y le pasa el carrito como parametro
        guardarProdcutosLS();//guarda los productos en el Local Storage
}

function renderizarProductos(productos) {//funcion para renderizar los productos, recibe el array productos y muestra los productos creados dentro del array

    contenedor.innerHTML = "";//siempre que renderiza limpia el contenedor

    for (const producto of productos) {//recorre el array de objetos


        const div = document.createElement("div");//creo el div
        div.className = "producto";
        div.innerHTML = `<img class="imagenes" src="${producto.imagen}" alt="">
                        <h2 class="nombreProducto">${producto.nombre}</h2>
                        <h2 class="precioProducto"> Precio: $ ${producto.precio}</h2>`;

        const input = document.createElement("input");//creo el input
        input.placeholder = "Cantidad";
        input.className = "cantidadInput";
        input.type = "number";

        const boton = document.createElement("button");//creo el boton
        boton.className = "boton agregar botones";//agrega las clases para que tome los estilo
        boton.innerText = "AGREGAR";

        boton.addEventListener("click", () =>{//creo la funcion para que tome los valores dle input al hacer click
            const cantidad = parseInt(input.value);

            agregarProducto(producto, cantidad);//ejecuto la funcion para agregar al carrito el nombre y la cantidad

            // console.log(cantidad)
        })



        div.append(input,boton);//agrego el input y el boton al div

        contenedor.append(div);//agrego el div al contenedor
    
    }
}

function devolverProducto() {
    alert("Deberá ingresar sus datos para coordinar la devolución del producto");

    const nombre = prompt("Ingrese su nombre completo");
    let telefono = prompt("Ingrese su teléfono");

    // Valido que sean numeros
    if (isNaN(telefono) || telefono.trim() === "") {
        alert("Por favor, ingrese un número de teléfono válido.");
        return;
    }

    telefono = parseInt(telefono);
    alert("Estimad@ " + nombre + "\nPronto uno de nuestros ejecutivos se contactará con usted, al número de teléfono " + telefono + " para coordinar la devolución del producto.\n Muchas gracias");
}

function mostrarCarrito() {
    let preciosTotales = {};
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        if (preciosTotales[producto.nombre]) {
            preciosTotales[producto.nombre] += producto.cantidad * producto.precio;
        } else {
            preciosTotales[producto.nombre] = producto.cantidad * producto.precio;
        }
    }
    let total = 0;
    let mensaje = "Productos en el carrito:\n";
    for (let nombre in preciosTotales) {
        let precioTotal = preciosTotales[nombre];
        mensaje += nombre + ": $ " + precioTotal + "\n";
        total += precioTotal;
    }
    mensaje += "\nPrecio total: $ " + total;
    alert(mensaje);
}

function pagar() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
    } else {
        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            total += carrito[i].valorTotal;
        }
        console.log(total);

        alert("Total a pagar: " + total);

        // Limpio el almacenamiento local
        localStorage.clear();

        // Vacio el carrito
        carrito = [];

        // Actualizo la tabla 
        renderizarCarrito(carrito);

        alert("Pago exitoso.\nMuchas gracias por su compra.");
        return;
    }
}

function ingresar() {
    let opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Devolver Producto\n2- Ver Carrito\n3- Pagar\n4- Salir"));

    while (opcion !== 4) {
        switch (opcion) {
            case 1:
                devolverProducto();
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Devolver Producto\n2- Ver Carrito\n3- Pagar\n4- Salir"));
                break;
            case 2:
                mostrarCarrito();
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Devolver Producto\n2- Ver Carrito\n3- Pagar\n4- Salir"));
                break;
            case 3:
                pagar();
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Devolver Producto\n2- Ver Carrito\n3- Pagar\n4- Salir"));
                break;
            default:
                alert("Opción inválida. Por favor, ingrese un número válido.");
                opcion = parseInt(prompt("Eliga la opción que desea realizar:\n1- Devolver Producto\n2- Ver Carrito\n3- Pagar\n4- Salir"));
                break;
        }
    }
}

//inicia el programa

// traigo el lemento por su id
const svgElement = document.getElementById('svg-icon');

// Asigno la funcion onclick y ejecuta la funicon ingresar
svgElement.onclick = function() {
    // Llama a la función ingresar al hacer clic en el icono carrito
    ingresar();
};
const contenedor = document.getElementById("contenedor");//creo una variable contenedor que llama en el documento por el id contendor
const tbodyCarrito = document.getElementById("carrito");//creo una variable tbodyCarrito que llama en el documento por el id carrito

const productos = [//creo los 4 porductos para mostrar
    new Producto("Poleras", 15000, "./img/poleras.avif"),
    new Producto("Tazones", 10000, "./img/tazones.webp"),
    new Producto("Cuadros", 20000, "./img/cuadros.jpeg"),
    new Producto("Funko-Pop", 10000, "./img/funkoPops.webp"),
]

let carrito = [];//creo un array vacio carrito

obtenerProductosLS();//muestra los productos del LS si los hay
renderizarProductos(productos);//le paso el array de objetos productos para renderizar
