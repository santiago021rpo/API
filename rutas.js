var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

var SoloAdmin = function(request, response, next){
   if(request.session.perfil == 'Administrador'){
      next()
   }
   else{
      response.json({state:false, mensaje:"Esta Api solo la pueden usar las Administradores"})
   }
}

app.post("/usuarios/Registrar", function(request, response){
    usuariosController.Registrar(request, response)
})

app.post("/usuarios/activar", function(request, response){
    usuariosController.Activar(request, response)
})

app.post("/usuarios/Login", function(request, response){
    usuariosController.Login(request, response)
})

app.put("/usuarios/Actualizar",SoloAdmin, function(request, response){
    usuariosController.Actualizar(request, response)
})

app.post("/usuarios/Eliminar",SoloAdmin, function(request, response){
    usuariosController.Eliminar(request, response)
})

app.get("/usuarios/Listar", function(request, response){
    usuariosController.Listar(request, response) 
})

app.post("/usuarios/ListarEmail/",SoloAdmin, function(request, response){
    usuariosController.ListarEmail(request, response)
})

app.post("/usuarios/estado/", function(request, response){
   response.json(request.session)
})

app.post("/usuarios/logout/", function(request, response){
   request.session.destroy()
   response.json({state:true, mensaje:"Sesion cerrada"})
})



// var persona = {
//     nombre:"john",
//     apellido:"Delgado",
//     nombrecompleto: function(){
//         return this.nombre + ' ' + this.apellido
//     }
// }




// persona.nombrecompleto()

var productosController = require("./api/controladores/productosController.js").productosController

app.post("/productos/Guardar",function(request, response){
    productosController.Guardar(request, response)
 })

app.post("/productos/Actualizar", function(request, response){
   productosController.Actualizar(request, response)
})

app.post("/productos/Eliminar", function(request, response){
   productosController.Eliminar(request, response)
})

app.post("/productos/Listar", function(request, response){
   productosController.Listar(request, response) 
})

app.post("/productos/ListarId/", function(request, response){
   productosController.ListarId(request, response)
})


// Servicio

var serviciosController = require("./api/controladores/serviciosController.js").serviciosController

app.post("/servicios/Guardar",SoloAdmin, function(request, response){
    serviciosController.Guardar(request, response)
 })

app.post("/servicios/Actualizar",SoloAdmin, function(request, response){
   serviciosController.Actualizar(request, response)
})

app.post("/servicios/Eliminar",SoloAdmin, function(request, response){
   serviciosController.Eliminar(request, response)
})

app.post("/servicios/Listar", function(request, response){
   serviciosController.Listar(request, response) 
})

app.post("/servicios/ListarId/", function(request, response){
   serviciosController.ListarId(request, response)
})


var anexosController = require("./api/controladores/anexosController.js").anexosController

app.post("/upload/:nombrearchivo",function(request, response){
  anexosController.Upload(request,response)
})

app.post("/avatar/:nombrearchivo",function(request, response){
   anexosController.Avatar(request,response)
 })