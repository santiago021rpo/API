var serviciosModel = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

var serviciosSchema = new Schema({
    nombre:String,
    codigo:String
})

const Mymodel = mongoose.model("servicios", serviciosSchema)

serviciosModel.ValidarCodigo = function(post, responder){
    Mymodel.find({codigo:post.codigo})
    .then((respuesta) => {
        return responder(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

serviciosModel.Guardar = function(post, callback){
    const instancia = new Mymodel

    instancia.nombre = post.nombre
    instancia.codigo = post.codigo

    instancia.save().then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

serviciosModel.Actualizar = function(post,callback){
    Mymodel.findOneAndUpdate({_id:post._id}, 
        {
            nombre:post.nombre
        })
        .then((respuesta) => {
            return callback({state:true})
         }).catch((error) => {
            console.log(error)
            return callback({state:false})
        })
         
}

serviciosModel.Eliminar = function(post,callback){
    Mymodel.findOneAndDelete({_id:post._id}, 
        )
        .then((respuesta) => {
            return callback({state:true})
         }).catch((error) => {
            console.log(error)
            return callback({state:false})
        })
         
}

serviciosModel.Listar = function(post, callback){
    Mymodel.find({},{})
    .then((respuesta) => {
        return callback(respuesta)
     }).catch((error) => {
        console.log(error)
        return callback([])
    })
}

serviciosModel.ListarId = function(post, callback){
    Mymodel.find({_id:post._id},{})
    .then((respuesta) => {
        return callback(respuesta)
     }).catch((error) => {
        console.log(error)
        return callback([])
    })
}
module.exports.serviciosModel = serviciosModel