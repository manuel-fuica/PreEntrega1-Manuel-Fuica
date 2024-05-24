//traigo los articulos desde el archivo articulos.json
fetch("articulos.json")
    .then(response => response.json())
    .then(articulos => {//cuando la promesa se resuelve se ejecuta lo siguiente
        const productos = Object.values(articulos);//obtiene los valores del objeto articulos y los convierte en un array
        renderizarProductos(productos);//renderiza los productos

    })
    .catch(error => {//en caso de no resolver la promesa me muestra este error en la consola
        console.error('Error al cargar el archivo JSON:', error);
    });
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
            Swal.fire({
                title: "Producto eliminado",
                icon: "success",
                width: 320
                });
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

            if (isNaN(cantidad) || cantidad <= 0) {
                Swal.fire({
                    title: "Por favor ingrese una cantidad valida",
                    icon: "warning",
                    customClass: {
                        confirmButton: "boton-aceptar",
                    }
                });
                return;
            }

            agregarProducto(producto, cantidad);//ejecuto la funcion para agregar al carrito el nombre y la cantidad

            Toastify({
                text: "Producto agregado al carrito",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){
                    mostrarCarrito();//muestra el carrito al dar click en la notificacion
                } // Callback after click
                }).showToast();

            // console.log(cantidad)
        })



        div.append(input,boton);//agrego el input y el boton al div

        contenedor.append(div);//agrego el div al contenedor
    
    }
}

async function devolverProducto() {
    let telefono = "";
    let nombre = "";
    const { value: formValues } = await Swal.fire({
        title: "Debera ingresar sus datos para coordinar la devolucion del producto",
        html: `
            <label for="swal-input1">Nombre Completo</label><br>
            <input id="swal-input1" class="swal2-input"><br>
            <label for="swal-input2">Teléfono</label><br>
            <input id="swal-input2" class="swal2-input"><br>
        `,
        focusConfirm: false,
        preConfirm: () => {
            return {
            nombre: document.getElementById("swal-input1").value,
            telefono: document.getElementById("swal-input2").value
            };
        }
        });
        if (formValues) {
        console.log(formValues);
        telefono = formValues.telefono;
        nombre = formValues.nombre;
        }

    // Valido que sean numeros
    if (isNaN(telefono) || telefono.trim() === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Debe ingresar un numero de telefono valido',
            icon: 'error',
            })
        return;
    }

    telefono = parseInt(telefono);
    Swal.fire("Estimad@ \n" + nombre + "\nPronto uno de nuestros ejecutivos se contactará con usted, al número de teléfono: \n " + telefono + " \npara coordinar la devolución del producto.\n Muchas gracias");
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
    Swal.fire(mensaje);
}

function pagar() {
    if (carrito.length === 0) {
        Swal.fire("No hay productos en el carrito.");
    } else {
        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            total += carrito[i].valorTotal;
        }

        // Limpio el almacenamiento local
        localStorage.clear();

        // Vacio el carrito
        carrito = [];

        // Actualizo la tabla 
        renderizarCarrito(carrito);

        Swal.fire({
            title: "Pago realizado",
            icon: "success"
            });;
        return;
    }
}

function ingresar() {
    Swal.fire({
        title: 'Bienvenido',
        color: '#81FE02',
        input: 'select',
        inputOptions: {
            '1': 'Devolver Producto',
            '2': 'Ver Carrito',
            '3': 'Pagar',
            '4': 'Salir'
        },
        inputPlaceholder: 'Seleccione una opción',
        showCancelButton: true,
        customClass: {
            popup: 'color-fondo'
        },
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, seleccione una opción.'
            }
        }
    }).then(async (result) => {
        if (result.value) {
            switch (result.value) {
                case '1':
                    await devolverProducto();
                    break;
                case '2':
                    mostrarCarrito();
                    break;
                case '3':
                    pagar();
                    break;
                case '4':
                    salir();
                    break;
            }
        }
    });
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

//ahora traere esto desde articulos.json
// const productos = [//creo los 4 porductos para mostrar
//     new Producto("Poleras", 15000, "./img/poleras.avif"),
//     new Producto("Tazones", 10000, "./img/tazones.webp"),
//     new Producto("Cuadros", 20000, "./img/cuadros.jpeg"),
//     new Producto("Funko-Pop", 10000, "./img/funkoPops.webp"),
// ]

let carrito = [];//creo un array vacio carrito

obtenerProductosLS();//muestra los productos del LS si los hay

