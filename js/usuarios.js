const registrarse = document.getElementById("registrarse");
const btnRegister = document.getElementById("btnRegister");
const btnLogin = document.getElementById("btnLogin");


// traemos los valores del session Storage a la variable usuarios y en caso de no haber cargamos un array vacío
let usuarios = JSON.parse(sessionStorage.getItem("usuarios")) || [];

// declaración de objeto usuario
class newUsuario {
    constructor (user, pass) {
        this.id = usuarios.length + 1;
        this.user = user;
        this.pass = pass;
        this.admin = false;
    }
}

// Evento click que te redirige a la vista register
registrarse.addEventListener("click", () => {
    userLogin.style.display = "none";
    userRegister.style.display =  "flex";
});


btnLogin.addEventListener("click", (e) => {
    // Forzamos que no se reinicie la página al apretar el botón
    e.preventDefault();
    // Obtenemos los valores de los input que van a ser los parámetros de la función logear
    const user = userLogin.children[0].children[1].value
    const pass = userLogin.children[1].children[1].value
    // llamamos a la función logear 
    logear(user, pass);
})


const logear = (user, pass) => {
    const userExiste = usuarios.find((usuario)  => usuario?.user.toLowerCase() === user.toLowerCase());
    if(userExiste === undefined){
        Swal.fire({
            icon: "error",
            title: "Usuario inexistente",
          });
    } else if (userExiste.pass !== pass) {
        Swal.fire({
            icon: "error",
            title: "Contraseña Incorrecta",
          });
    } else{
        let usuario = {
            user: userExiste.user,
            pass: userExiste.pass,
            admin: userExiste.admin
        }

        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        location.href = "../index.html";
    }
}


// 
btnRegister.addEventListener("click", (e) => {
    // Forzamos que no se reinicie la página al apretar el botón
    e.preventDefault()
    // Obtenemos los valores de los input
    const user = userRegister.children[0].children[1].value
    const pass = userRegister.children[1].children[1].value
    // Creamos el nuevo usuario que vamos a mandar a la función registrar como parámetro
    const nuevoUsuario = new newUsuario(user, pass)
    // llamamos a la función registrar
    registrar(nuevoUsuario)
});


// Función que se encarga de registrar un nuevo usuario y validar si ya existe
const registrar = (nuevoUsuario) => {
    // Buscamos si el usuario ya se encuentra registrado
    const usuarioExistente = usuarios.find(usuario => usuario?.user === nuevoUsuario.user);
    // Si el usuario no se encuentra lo agregamos al array usuarios y cargamos al sessionStorage
    if(usuarioExistente === undefined){
        usuarios.push(nuevoUsuario);
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
        Swal.fire({
            icon: "success",
            title: "Te has registrado correctamente",
            text: "Ahora inicie sesión",
          });
        // Redirigimos a la vista login, en este caso invirtiendo los display
        userRegister.style.display = "none";
        userLogin.style.display = "flex";   
    }else{
        // Si el usuario ya existe damos un aviso
        Swal.fire({
            icon: "error",
            title: "El usuario ya existe",
          });
    }
}