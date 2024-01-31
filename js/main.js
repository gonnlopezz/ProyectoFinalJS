const productsContainer = document.getElementById("productsContainer");


const mostrarProductos = productos => {
    productsContainer.innerHTML = "";
    productos.forEach(item => {
        const { id, imagen, nombre, precio } = item;
        let card = document.createElement("div");
        card.className = "card"
        card.innerHTML = `
        <h2>${nombre}</h2>
        <p>$${precio}</p>
        <button class="card__input" id="add${id}" class="buy__button">Añadir al carrito</button>
        `
        productsContainer.append(card);
    });
}


fetch(" ./data.json")
.then((response) => response.json())
.then((data) => {
    mostrarProductos(data);
});     
