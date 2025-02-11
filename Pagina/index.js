var datos = []
var cargarTodo = function(){

   

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            datos = JSON.parse(this.responseText).datos

            var misdatos = document.getElementById("misdatos")
            misdatos.innerHTML = ""

            for (let a = 0; a < datos.length; a++) {
                misdatos.innerHTML += `   <tr>
                                            <td>${datos[a].nombre}</td>
                                            <td>${datos[a].apellido}</td>
                                            <td>${datos[a].email}</td>
                                            <td>${datos[a].password}</td>
                                          </tr>`
                
            }
        }
        });

        xhr.open("GET", "http://localhost:3000/usuarios/Listar");

        xhr.send();

}
var abrirModal = function(){
    $('#exampleModal').modal('show')
}

var Guardar = function(){
    var nombre = document.getElementById("nombre").value
    var apellido = document.getElementById("apellido").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var data = `email=${email}&nombre=${nombre}&apellido=${apellido}&password=${password}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        var mirespuesta = JSON.parse(this.responseText);
        if(mirespuesta.state == false){

            Swal.fire({
                title: 'Error!',
                text: mirespuesta.mensaje,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
        else{
            Swal.fire({
                title: 'Bien!',
                text: mirespuesta.mensaje,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              $('#exampleModal').modal('hide')
              cargarTodo()
        }
      }
    });
    
    xhr.open("POST", "http://localhost:3000/usuarios/Registrar");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.send(data);

}



cargarTodo()