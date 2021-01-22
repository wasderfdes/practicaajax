/* ------------ PARTE A ------------------- */

// que carge la funcion de las listas de categorias
window.onload = cargarListaCategorias();


// metodo que carga la lista de categorias - parte A
function cargarListaCategorias(){

    // iniciar la variable xmlHttpResquest
    let conec = new XMLHttpRequest();

    //crear la conexion con el server 
    conec.open("GET", "./server/servCategoria.php",true);

    //conexion y respuesta y funcion
    // comprobar el valor de la respuesta
    conec.onreadystatechange = function(){

        // si se ha conectado y esta bien muestre
        if(conec.readyState == 4 && conec.status == 200){
            
            // obtener los datos del servidor
            let datos = JSON.parse(this.response);

            // crea el nodo del formulario
            listCategoria(datos);
        }

    }

    // enviar la peticion
    conec.send();

}

// metodo que crea el nodo para la lista
function listCategoria(datos){

    let formulario = document.createElement("form");
    formulario.method = "GET";
    formulario.id = "formCategorias";

    let lista = document.createElement("select");
    lista.id = "categorias";

    for(let clave of datos){
        let opcion = document.createElement("option");
        opcion.id= clave.cod_categoria;
        opcion.name = clave.cod_categoria;
        let texto = document.createTextNode(
           "Cod_categoria: " + clave.cod_categoria + " ---  Descripción: " +clave.descripcion
        );
        opcion.appendChild(texto);
        lista.appendChild(opcion);

    }

    // añadir la lista al formulario
    formulario.appendChild(lista);

    // y añadir el formulario al div correspondiente
    document.getElementById("contenedor").appendChild(formulario);

    // metodo para la parte B
    enviarDatos();

}



/* -------------- PARTE B ---------------------------- */



// método que envia los datos al servidor - parte B
function enviarDatos(){

    // crear el boton para enviar datos
    let boton = document.createElement("input");
    boton.type="submit";
    boton.value = "Enviar";
    boton.id = "enviar";
    boton.style.marginTop = "1%";
    boton.onclick = function(){

        // variable a guardar
        let datosEnviar = "";

        // datos a enviar
        let categorias = document.getElementsByTagName("option");

        //recorrer cual esta seleccionado y mandarlo
        for(let i = 0; i<categorias.length;i++){
            if(categorias[i].selected){
                datosEnviar = categorias[i].name;
            }
        }

        //compruebo que cod envia
        console.log(datosEnviar)

        // enviar los datos de forma POST
        envioDatosServidor(datosEnviar);

    }

    // pegar el boton
    document.getElementById("contenedor").appendChild(boton);

}

// método que envia los datos al servidor
function envioDatosServidor(datos){

    // variable de objeto ajax
    let conec = new XMLHttpRequest();

    // que sea tipo texto
    conec.responseType = "text";

    // crear la conexion y los datos
    conec.open('POST', "./server/servCargaCategoria.php", true);
    conec.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // ver si esta todo ok
    conec.onreadystatechange = function(){

        // si se ha conectado y esta bien muestre
        if(conec.readyState == 4 && conec.status == 200){

            //saber si ha enviado los datos
            alert(conec.response);

        }

    }

    // enviar la peticion 
    conec.send(datos);

}