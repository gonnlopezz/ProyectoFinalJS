


// Función que muestra los productos disponibles en el DOM
const mostrarProductos = productos => {
    sessionStorage.setItem("productos", JSON.stringify(productos));
    productosContainer.innerHTML = "";
    productos.forEach(item => {
        // Desestructuración de las propiedades del item
        const { id, nombre, imagen, precio } = item;
        let card = document.createElement("div");
        card.className = "card"
        card.innerHTML = `
        <img src="${imagen}"></img>
        <div class="text">
        <h2>${nombre.toUpperCase()}</h2>
        <p>$${precio}</p>
        </div>
        <span id="add${id}" class="buy__button"><img src="./media/market.png"></img></span>
        `
        productosContainer.append(card);
        const btnAgregar = document.getElementById(`add${id}`);
        btnAgregar.addEventListener("click", () => agregarProducto(id));
    });
    
}


fetch(" ./data.json")
.then((response) => response.json())
.then((data) => {
    mostrarProductos(data);
});     

const btnCarrito = document.getElementById("cartButton");
btnCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "flex";
    pintarCarrito();
});