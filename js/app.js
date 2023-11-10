// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector("#lista-tweets")
let tweets = []; // para almacenar los tweets creamos un arreglo vacio

// Event Listeners
eventListeners();
function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // para que tweets no se asigne como null en caso de no encontrar twwets almacenados
        console.log(tweets);

        crearHTML();
    });
}




// Funciones
function agregarTweet(e){
    e.preventDefault();

    // TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value; // .value para obtener el texto ingresado en el textArea
    
    // Validación...
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacío');
        return; // Previene que se sigan ejecutando mas lineas de código
    }console.log('Agregando tweet');

    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // una vez agregado el tweet al arreglo creamos el HTML
    crearHTML();

    // Reiniciar le fomrulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error){
    const errorExistente = document.querySelector('.error');
    if(errorExistente){
        errorExistente.remove();
    }

    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    
    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000)
}

// Muestra unn listado de los tweets
function crearHTML(){
    limpiarHTML()
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            // Añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }
            // Crear el html
            const li = document.createElement('li');
            //Añadir el texto
            li.innerText = tweet.texto;
            // Asignar el boton
            li.appendChild(btnEliminar);
            // insertarlo en el html
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

// Agrega los tweets actuales a localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimna un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}