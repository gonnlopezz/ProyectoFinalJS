// En caso de no haber carrito, cargamos al sessionStorage un carrito vacío
JSON.parse(sessionStorage.getItem("carrito")) == null && sessionStorage.setItem("carrito", JSON.stringify([]));


const modalCarrito = document.getElementById("modalCarrito")
const carritoContainer = document.getElementById("carritoContainer");

let carrito = JSON.parse(sessionStorage.getItem("carrito"));

const agregarProducto = idProducto => {
        const productosDisponibles = JSON.parse(sessionStorage.getItem("productos"));
        let productoCargado = productosDisponibles.find(item => item.id === idProducto);
        const { precio } = productoCargado;
        const repeat = carrito.some(item => item.id === idProducto);
        if (repeat) {
            carrito.map(item => {
                if (item.id == idProducto) {
                    item.cantidad++;
                    item.precio = precio * item.cantidad;
                }
            });
        } else {
            carrito.push(productoCargado);
        }
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        pintarCarrito();
    }


const pintarCarrito = () => {
    carritoContainer.innerHTML = "";
    if (carrito.length > 0) {
        carrito.forEach(item => {
            let card = document.createElement("div");
            card.className = "shop__card";
            const { id, nombre, imagen, precio, cantidad } = item;
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
            </div>  
        `
            carritoContainer.append(card);
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
        <button class="btn__buy">Comprar</button>
        <button id="btnVaciar" class="btn__erase">Vaciar Carrito</button>
        `;
        // Agregamos el footer al padre carritoContainer
        carritoContainer.append(footerCarrito);
        const btnVaciar = document.getElementById("btnVaciar");
        btnVaciar.addEventListener("click", () => vaciarCarrito());
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
btnClose.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});


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


const vaciarCarrito = () => {
            // Si confirmamos la acción, cambiamos el valor de carrito a un arreglo vacío
            carrito = [];
            // Llamamos a la funcion pintarCarrito y lo cargamos al sessionStorage
            pintarCarrito();
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            // Función de librería que muestra un cartel de producto eliminado
        }