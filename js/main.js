const productsContainer = document.getElementById("productsContainer");


const mostrarProductos = productos => {
    productsContainer.innerHTML = "";
    productos.forEach(item => {
        const { id, nombre, imagen, precio } = item;
        let card = document.createElement("div");
        card.className = "card"
        card.innerHTML = `
        <img src="${imagen}"></img>
        <div class="text">
        <h2>${nombre}</h2>
        <p>$${precio}</p>
        </div>
        <span id="add${id}" class="buy__button"><img src="./media/market.png"></img></span>
        `
        productsContainer.append(card);
    });
}


fetch(" ./data.json")
.then((response) => response.json())
.then((data) => {
    mostrarProductos(data);
});     
