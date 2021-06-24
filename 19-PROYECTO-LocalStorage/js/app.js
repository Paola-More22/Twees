// Variables 
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listener

eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    // Cuando el docmento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets") ) || [];

        console.log(tweets);

        crearHTML();
    });
}



// Funciones 
function agregarTweet(e) {
    e.preventDefault();

    // textarea donde el usuario escribe 
    const tweet = document.querySelector("#tweet").value;
    
    // Validacion 
    if(tweet === ""){
        mostrarError("El mensaje no puede ir vacio");
        return; // evita que se ejecuten mas lineas de codigo
    }

    const tweetsObj = {
        id: Date.now(),
        //tweet: tweet, --> cuando son iguales se deja uno como en el ejemplo de abajo
        tweet,
    }

    // Añadir el arreglo de tweets
    console.log({tweets})
    tweets = [...tweets, tweetsObj];

    // Una vez agrgado vamos a Crear HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar msj de erros
function mostrarError(error){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    //Insertarlo en el contenido 
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    // Eliminar la alerta despues de 3 segundos
    setTimeout (() => {
        mensajeError.remove()
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {

            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent = "x"

            // Añadir la funcion de elminar 
            btnEliminar.onclick = () => {
                borrarTweets(tweet.id);
            }

            // crear HTML
            const li = document.createElement("li");

            //añadir el text 
            li.innerText = tweet.tweet;

            // Asignar el botón 
            li.appendChild(btnEliminar);

            // Insertarlo en el html
            listaTweets.appendChild(li);

        })
    }
    sincronizarStorage();
}

// Agregar los Tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Eliminar Tweets
function borrarTweets(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();

}


// Limpiar html
function limpiarHTML(){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
