var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

app.post("/usuarios/Registrar", function(request, response){
    usuariosController.Registrar(request, response)
})

app.get("/usuarios/activar/:email/:codigo", function(request, response){
    usuariosController.Activar(request, response)
})

app.post("/usuarios/Login", function(request, response){
    usuariosController.Login(request, response)
})

app.put("/usuarios/Actualizar", function(request, response){
    usuariosController.Actualizar(request, response)
})


app.delete("/usuarios/Eliminar", function(request, response){
    usuariosController.Eliminar(request, response)
})

app.get("/usuarios/Listar", function(request, response){
    usuariosController.Listar(request, response) 
})

app.post("/usuarios/ListarEmail/", function(request, response){
    usuariosController.ListarEmail(request, response)
})

// var persona = {
//     nombre:"john",
//     apellido:"Delgado",
//     nombrecompleto: function(){
//         return this.nombre + ' ' + this.apellido
//     }
// }




// persona.nombrecompleto()