const searchInput = document.getElementById("searchInput");
const btnUser = document.getElementById("userButton");
const modalUser = document.getElementById("modalUser");

// Evento click al boton de usuario
btnUser.addEventListener("click", () => {
    // traemos del sessionStorage la clave usuario
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    // Borramos el contenido del modal user
    modalUser.innerHTML = "";
    modalUser.style.display == "flex" ? modalUser.style.display = "none" : modalUser.style.display = "flex";
    // Si no existe usuario se muestra un boton de iniciar sesión en el modal
    if(!usuario) {
        const entrar = document.createElement("button");
        entrar.innerHTML = "Iniciar Sesión";
        // Evento click que te redirige a la vista loguear
        entrar.addEventListener("click", () => {
            location.href = "./pages/usuarios.html";
        });
        modalUser.append(entrar);
        // Si el usuario existe se muestra el nombre del mismo, una imagen y un boton para cerrar sesión
    } else {
        modalUser.innerHTML = `
        <img src="./media/perfil.png"></img>
        <p>${usuario.user}</p>
        `
        const close = document.createElement("button");
        close.innerHTML = "Cerrar Sesión";
        // Evento click que recarga la página y borra el usuario del sessionStorage
        close.addEventListener("click", () => {
            sessionStorage.removeItem("usuario");
            location.reload();
        });
        modalUser.append(close);
    }
});

// Función que muestra los productos disponibles en el DOM
const mostrarProductos = productos => {
    productosContainer.innerHTML = "";
    // Ciclo forEach que crea las cards en base a los productos
    productos.forEach(item => {
        // Desestructuración de las propiedades del item
        const { id, nombre, imagen, precio } = item;
        // Creación de un div card para cada item del array productos
        let card = document.createElement("div");
        card.className = "card"
        // Añade a la card las propiedades del item
        card.innerHTML = `
        <img src="${imagen}"></img>
        <div class="text">
        <h2>${nombre.toUpperCase()}</h2>
        <p>$${precio}</p>
        </div>
        <span id="add${id}" class="buy__button"><img src="./media/market.png"></img></span>
        `
        // Añade la card al padre productosContainer
        productosContainer.append(card);
        // Evento click que llama a la función agregarProducto
        const btnAgregar = document.getElementById(`add${id}`);
        btnAgregar.addEventListener("click", () => agregarProducto(id));
    });
    
}




// Mediante fetch llamamos una ruta relativa donde se encuentran los productos
fetch(" ./data.json")
.then((response) => response.json())
.then((data) => {
    sessionStorage.setItem("productos", JSON.stringify(data));
    // Llamamos a la función mostrarProductos
    mostrarProductos(data);
    // Llamamos a la funcion mostrarCantidad
    mostrarCantidad();
});     


const btnCarrito = document.getElementById("cartButton");
// Evento click que se encarga de mostrar el modalCarrito
btnCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "flex";
    pintarCarrito();
});


// Evento click que llama la función buscarProducto
// Evento keydown que llama la función buscarProducto si se apreta el enter
searchInput.addEventListener("keyup", (e) => {
    const productosDisponibles = JSON.parse(sessionStorage.getItem("productos"));
    let productosFiltrados = productosDisponibles.filter(item => item.nombre.toLowerCase().includes(e.target.value));
    if(e.target.value !== "") {
        mostrarProductos(productosFiltrados);
    } else {
        const productosDisponibles = JSON.parse(sessionStorage.getItem("productos"));
        mostrarProductos(productosDisponibles);
    }
});
