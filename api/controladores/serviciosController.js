
var serviciosModel = require("../modelos/serviciosModel.js").serviciosModel
var serviciosController = {}

serviciosController.Guardar = function(request, response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ''){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    serviciosModel.ValidarCodigo(post, function(respuesta){
        if(respuesta.length == 0){
            serviciosModel.Guardar(post, function(respuesta2){
            if(respuesta2.state == true){
                response.json({state:true, mensaje:"Elemento guardado correctamente"})
              }
              else{
                response.json({state:false, mensaje:"Error al guardar el elemento"})
              }             
            })
        }
        else{
            response.json({state:false, mensaje:"El codigo de este elemento ya existe"})

        }
    })


}

serviciosController.Actualizar = function(request, response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
    }

    if(post._id == undefined || post._id == null || post._id == ''){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }


    serviciosModel.Actualizar(post, function(respuesta2){
    if(respuesta2.state == true){
        response.json({state:true, mensaje:"Elemento actualizado correctamente"})
        }
        else{
        response.json({state:false, mensaje:"Error al actualizar el elemento"})
        }             
    })

}

serviciosController.Eliminar = function(request, response){
    var post = {
        _id:request.body._id,

    }

    if(post._id == undefined || post._id == null || post._id == ''){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    serviciosModel.Eliminar(post, function(respuesta2){
    if(respuesta2.state == true){
        response.json({state:true, mensaje:"Elemento eliminado correctamente"})
        }
        else{
        response.json({state:false, mensaje:"Error al eliminar el elemento"})
        }             
    })
}

serviciosController.Listar = function(request, response){
    serviciosModel.Listar(null, function(respuesta){
        response.json(respuesta)
    })
}

serviciosController.ListarId = function(request, response){
    var post = {
        _id:request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ''){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    serviciosModel.ListarId(post, function(respuesta){
        response.json(respuesta)
    })
}

module.exports.serviciosController = serviciosController