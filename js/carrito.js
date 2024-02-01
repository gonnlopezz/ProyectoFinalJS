// En caso de no haber carrito, cargamos al sessionStorage un carrito vacío
JSON.parse(sessionStorage.getItem("carrito")) == null && sessionStorage.setItem("carrito", JSON.stringify([]));

const modalCarrito = document.getElementById("modalCarrito")
const carritoContainer = document.getElementById("carritoContainer");

let carrito = JSON.parse(sessionStorage.getItem("carrito"));

const agregarProducto = idProducto => {
    const productosDisponibles = JSON.parse(sessionStorage.getItem("productos"));
    let productoCargado = productosDisponibles.find(item => item.id === idProducto);
    const {precio} = productoCargado;
    const repeat = carrito.some(item => item.id === idProducto);
    if(repeat) {
        carrito.map(item => {
            item.cantidad++;
            item.precio = precio * item.cantidad;
        })
    } else {
        carrito.push(productoCargado);
    }
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
}

const pintarCarrito = () => {
    console.log(carrito);
    carritoContainer.innerHTML = "";
    carrito.forEach(item => {
        let card = document.createElement("div");
        card.className = "shop__card";
        const {nombre, imagen, precio, cantidad} = item;
        card.innerHTML = `
        <img class="card__img" src="${imagen}">  
        <p class="card__title">${nombre}</p>
        <p>${precio}</p>
        `
        carritoContainer.append(card);
    })
}

const btnClose = document.getElementById("btnClose");
btnClose.addEventListener("click", () =>  {
    modalCarrito.style.display = "none"
    pintarCarrito();
});