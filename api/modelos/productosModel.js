var productosModel = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

var productosSchema = new Schema({
    nombre:String,
    codigo:String,
    imagen:String,
    precio:String,
    descripcion:String
})

const Mymodel = mongoose.model("productos", productosSchema)

productosModel.ValidarCodigo = function(post, responder){
    Mymodel.find({codigo:post.codigo})
    .then((respuesta) => {
        return responder(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

productosModel.Guardar = function(post, callback){
    const instancia = new Mymodel

    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.imagen = post.imagen
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion


    instancia.save().then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

productosModel.Actualizar = function(post,callback){
    Mymodel.findOneAndUpdate({_id:post._id}, 
        {
            nombre:post.nombre,
            imagen:post.imagen,
            precio:post.precio,
            descripcion:post.descripcion,
            codigo:post.codigo


        })
        .then((respuesta) => {
            return callback({state:true})
         }).catch((error) => {
            console.log(error)
            return callback({state:false})
        })
         
}

productosModel.Eliminar = function(post,callback){
    Mymodel.findOneAndDelete({_id:post._id}, 
        )
        .then((respuesta) => {
            return callback({state:true})
         }).catch((error) => {
            console.log(error)
            return callback({state:false})
        })
         
}

productosModel.Listar = function(post, callback){
    Mymodel.find({},{})
    .then((respuesta) => {
        return callback(respuesta)
     }).catch((error) => {
        console.log(error)
        return callback([])
    })
}

productosModel.ListarId = function(post, callback){
    Mymodel.find({_id:post._id},{})
    .then((respuesta) => {
        return callback(respuesta)
     }).catch((error) => {
        console.log(error)
        return callback([])
    })
}

productosModel.Mymodel = Mymodel
module.exports.productosModel = productosModel