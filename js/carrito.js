// En caso de no haber carrito, cargamos al sessionStorage un carrito vacío
JSON.parse(sessionStorage.getItem("carrito")) == null && sessionStorage.setItem("carrito", JSON.stringify([]));

// Obtenemos el carrito del Storage
let carrito = JSON.parse(sessionStorage.getItem("carrito"));

const modalCarrito = document.getElementById("modalCarrito")
const carritoContainer = document.getElementById("carritoContainer");



const cantidadCarrito = document.getElementById("cantidadCarrito");


// Función que agrega el producto con el id llamado al carrito
const agregarProducto = idProducto => {
    // Obtenemos del sessionStorage los productos
    const productosDisponibles = JSON.parse(sessionStorage.getItem("productos"));
    // Buscamos el producto segun el id
    let productoCargado = productosDisponibles.find(item => item.id === idProducto);
    // Desestructuramos el valor precio del producto cargado
    const { precio } = productoCargado;
    // Verificamos con una función some si el producto ya existe en el carrito
    const repeat = carrito.some(item => item.id === idProducto);
    if (repeat) {
        modalCarrito.style.display = "flex";
        carrito.map(item => {
            if (item.id == idProducto) {
                // Si el producto ya esta en el carrito aumentamos la propiedad cantidad en 1
                item.cantidad++;
                // Calculamos el precio en base al producto de la cantidad del item por el precio del producto
                item.precio = precio * item.cantidad;
            }
        });
    } else {
        if(carrito.length < 4) {
                modalCarrito.style.display = "flex";
                carrito.push(productoCargado);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Carrito lleno!",
                    text: "No puedes agregar mas de 4 productos distintos al carrito!",
                  });
        }
    }
    // Cargamos el carrito al sessionStorage
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    // Invocamos la funcion pintarCarrito
    pintarCarrito();
    }



// Función que se encarga de mostrar la cantidad de productos que hay en el carrito
const mostrarCantidad = () => {
    if(carrito.length > 0) {
        cantidadCarrito.style.display = "block"
        cantidadCarrito.innerHTML = `${carrito.length}`;
    } else {
        cantidadCarrito.style.display = "none"
    };
    
}



// Función que se encarga de dibujar el modal carrito
const pintarCarrito = () => {
    // Borra el contenido HTML del modal
    carritoContainer.innerHTML = "";
    // Invocamos la funcion mostrarCantidad
    mostrarCantidad();
    // Si hay productos en el carrito dibuja las cards de los mismos
    if (carrito.length > 0) {
        // Creación de un div para contener a las cards de los productos
        let carritoProductos = document.createElement("div");
        carritoProductos.className = "carrito__productos";
        // Añade el div al padre carritoContainer
        carritoContainer.append(carritoProductos);
        carrito.forEach(item => {
            // Creación de un div card para cada item del carrito
            let card = document.createElement("div");
            card.className = "shop__card";
            // Desestructuración de las propiedades del item
            const { id, nombre, imagen, precio, cantidad } = item;
            // Añade a la card las propiedades del item
            card.innerHTML = `
            <img class="card__img" src="${imagen}">
            <div class="card__text">
                <div class="card__header">
                <p class="card__title">${nombre}</p>
                <span id="btnRemove${id}" class="btn__remove"><img src="./media/thrash.png"></img></span>
                </div>
                <div class="card__body">
                    <div class="action__buttons">
                        <button id="btnSusbtract${id}" class="btn__substract">-</button>
                        <p class="cantidad">${cantidad}</p>
                        <button id="btnAdd${id}" class="btn__add">+</button>
                    </div>
                    <p class="precio">$ ${precio}</p>
                </div>
            </div>   `
            // Añade la card al padre carritoProductos
            carritoProductos.append(card);
            const botonEliminar = document.getElementById(`btnRemove${id}`);
            botonEliminar.addEventListener("click", () => eliminarProducto(id));
            const botonSumar = document.getElementById(`btnAdd${id}`);
            botonSumar.addEventListener("click", () => sumarProducto(id))
            const botonRestar = document.getElementById(`btnSusbtract${id}`);
            botonRestar.addEventListener("click", () => restarProducto(id));
        });
        // variable que mediante la función reduce suma el precio de los productos del carrito
        let precioTotal = carrito.reduce((acum, item) => acum + item.precio, 0);
        // Creación de un div que va a ser el footer del carrito
        let footerCarrito = document.createElement("div");
        footerCarrito.className = "footer__carrito"
        // Agregamos al footer la variable precio total, un boton para vaciar el carrito y un botón de compra
        footerCarrito.innerHTML = `
        <div class="precio__total">
        <p class="precio__text">Total</p>
        <p class="precio__text">$ ${precioTotal}</p>
        </div>
        <button id="btnComprar" class="btn__buy">Comprar</button>
        <button id="btnVaciar" class="btn__erase">Vaciar Carrito</button>
        `;
        // Agregamos el footer al padre carritoContainer
        carritoContainer.append(footerCarrito);
        const btnVaciar = document.getElementById("btnVaciar");
        // Evento click que llama a la función vaciarCarrito
        btnVaciar.addEventListener("click", () => vaciarCarrito());
        const btnComprar = document.getElementById("btnComprar");
        // Evento click que llama a la función ComprarCarrito
        btnComprar.addEventListener("click", () => comprarCarrito());
    } else {
        // Creación de un div content
        let content = document.createElement("div");
        content.className = "empty__content";
        // Mostramos el texto carrito vacío y una imagen
        content.innerHTML = `
        <img class="empty__img" src="./media/emptyMarket.png"></img>
        <h2 class="empty__text">Tu carrito esta vacío</h2>
        `
        // Agregamos el div content al padre carritoProducts
        carritoContainer.append(content);
    }
}

const btnClose = document.getElementById("btnClose");
// Evento click que oculta el modalCarrito
btnClose.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});


// Función que suma cantidad a un producto existente con el id llamado al carrito
const sumarProducto = idProducto => {
    const productosDisponibles = JSON.parse(sessionStorage.getItem("productos"));
    let productoCargado = productosDisponibles.find(item => item.id === idProducto);
    const { precio } = productoCargado;
    // Al producto que coincida con el id llamado le sumamos 1 a la cantidad
    carrito.map(item => {
        if (item.id == idProducto) {
            item.cantidad++;
            item.precio = precio * item.cantidad;
        }
    });
    // Llamamos a la funcion pintarCarrito y lo cargamos al sessionStorage
    pintarCarrito();
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
};


const restarProducto = idProducto => {
    const productosDisponibles = JSON.parse(sessionStorage.getItem("productos"));
    let productoCargado = productosDisponibles.find(item => item.id === idProducto);
    const { precio } = productoCargado;
    console.log(productoCargado);
    // Al producto que coincida con el id llamado le restamos 1 a la cantidad si el producto tiene mas de 1 cantidad
    // Si el producto tiene 1 cantidad lo borramos
    carrito.map(item => {
        if (item.cantidad > 1) {
            if (item.id === idProducto) {
                item.cantidad--;
                item.precio = precio * item.cantidad;
            }
        } else {
            if (item.id === idProducto) {
            eliminarProducto(idProducto);
            }
        }
    });
    // Llamamos a la funcion pintarCarrito y lo cargamos al sessionStorage
    pintarCarrito();
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
};


const eliminarProducto = idProducto => {
    // Creación de un filtrado dejando fuera el producto que coincida con el id llamado
    let nuevoCarrito = carrito.filter(item => item.id != idProducto);
    // Igualamos el valor de carrito al nuevo array filtrado
    carrito = nuevoCarrito;
    // Llamamos a la funcion pintarCarrito y lo cargamos al sessionStorage
    pintarCarrito();
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    if (carrito.length === 0) {
        console.log(carrito);
        modalCarrito.style.display = "none";
    }

}


// Función que se encarga de vaciar el carrito
const vaciarCarrito = () => {
    // Función de librería que muestra un cartel pidiendo confirmación para realizar la acción
            Swal.fire({
                title: "Estás seguro?",
                text: "Borrarás tu carrito al confirmar!!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si confirmamos la acción, cambiamos el valor de carrito a un arreglo vacío
                    carrito = [];
                    // Llamamos a la funcion pintarCarrito y lo cargamos al sessionStorage
                    pintarCarrito();
                    sessionStorage.setItem("carrito", JSON.stringify(carrito));
                    // Función de librería que muestra un cartel de producto eliminado
                    modalCarrito.style.display = "none";
                    Swal.fire({
                        title: "Carrito Borrado!",
                        text: "Borraste el carrito con éxito",
                        icon: "success"
                    });
                }
            });
        }


// Función que muestra cartel de confirmación de la compra
const comprarCarrito = () => {
    // Función de librería que muestra un cartel de confirmación
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Haz click para confirmar la compra",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Comprar!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Si confirmamos la acción, cambiamos el valor de carrito a un arreglo vacío ya que se realizo la compra
            carrito = [];
            // Llamamos a la funcion pintarCarrito y lo cargamos al sessionStorage
            pintarCarrito();
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            // mostramos un cartel de compra realizada
            Swal.fire({
                title: "¡Compra realizada!",
                text: "Realizaste la compra exitosamente",
                icon: "success"
            });
        }
    });
}