
var productosModel = require("../modelos/productosModel.js").productosModel
var productosController = {}

productosController.Guardar = function(request, response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        imagen:request.body.imagen,
        precio:request.body.precio,
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ''){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ''){
        response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
        return false
    }

    if(post.imagen == undefined || post.imagen == null || post.imagen == ''){
        response.json({state:false, mensaje:"El campo imagen es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ''){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }

    productosModel.ValidarCodigo(post, function(respuesta){
        if(respuesta.length == 0){
            productosModel.Guardar(post, function(respuesta2){
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

productosController.Actualizar = function(request, response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        imagen:request.body.imagen,
        precio:request.body.precio,
        codigo:request.body.codigo
    }

    if(post._id == undefined || post._id == null || post._id == ''){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ''){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }

    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ''){
        response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
        return false
    }


    productosModel.Actualizar(post, function(respuesta2){
    if(respuesta2.state == true){
        response.json({state:true, mensaje:"Elemento actualizado correctamente"})
        }
        else{
        response.json({state:false, mensaje:"Error al actualizar el elemento"})
        }             
    })

}

productosController.Eliminar = function(request, response){
    var post = {
        _id:request.body._id,

    }

    if(post._id == undefined || post._id == null || post._id == ''){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    productosModel.Eliminar(post, function(respuesta2){
    if(respuesta2.state == true){
        response.json({state:true, mensaje:"Elemento eliminado correctamente"})
        }
        else{
        response.json({state:false, mensaje:"Error al eliminar el elemento"})
        }             
    })
}

productosController.Listar = function(request, response){
    productosModel.Listar(null, function(respuesta){
        response.json(respuesta)
    })
}

productosController.ListarId = function(request, response){
    var post = {
        _id:request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ''){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    productosModel.ListarId(post, function(respuesta){
        response.json(respuesta)
    })
}

module.exports.productosController = productosController