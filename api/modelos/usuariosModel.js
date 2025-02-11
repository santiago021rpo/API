var usuariosModel = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

var usuariosSchema = new Schema({
    email:String,
    nombre:String,
    apellido:String,
    password:String,
    estado:String,
    codigo:String
})

const Mymodel = mongoose.model("usuarios", usuariosSchema)


usuariosModel.Registrar = function(post, responder){

    const instancia = new Mymodel
    instancia.email = post.email
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.password = post.password
    instancia.estado = post.estado
    instancia.codigo = post.codigo

    instancia.save().then((respuesta) => {
        return responder({state:true})
    }).catch((error) => {
        console.log(error)
        return responder({state:false})
    })

}

usuariosModel.verPosicionEmail = function(post, responder){

    Mymodel.find({email:post.email})
    .then((respuesta) => {
        return responder(respuesta)
    }).catch((error) => {
        console.log(error)
    })

}

usuariosModel.Actualizar = function(post, responder){

    Mymodel.updateOne({email:post.email},{
        nombre: post.nombre,
        apellido: post.apellido
    }).then((respuesta) => {
        return responder({state:true})
    }).catch((error) => {
        console.log(error)
        return responder({state:false})
    })


    // usuarios[post.posicion].nombre = post.nombre
    // usuarios[post.posicion].apellido = post.apellido
    // return responder({state:true})
}

usuariosModel.Eliminar = function(post, responder){

    Mymodel.deleteOne({email:post.email})
    .then((respuesta) => {
        return responder({state:true})
    }).catch((error) => {
        console.log(error)
        return responder({state:false})
    })


    // usuarios.splice(post.posicion,1)
    // return responder({state:true})
}

usuariosModel.Listar = function(post, responder){
    Mymodel.find({},{password:0,codigo:0}).then((respuesta) => {
        return responder(respuesta)
    }).catch((error) => {
        console.log(error)
        return responder({})
    })
    // return responder ({datos:usuarios})
}

usuariosModel.Login = function(post, responder){
    Mymodel.find({email:post.email,password:post.password},{nombre:1,apellido:1,estado:1}).then((respuesta) => {
        return responder(respuesta)
    }).catch((error) => {
        console.log(error)
        return responder({})
    })
}

usuariosModel.ListarEmail = function(post, responder){
    Mymodel.find({email:post.email},{password:0,codigo:0}).then((respuesta) => {
        return responder(respuesta)
    }).catch((error) => {
        console.log(error)
        return responder({})
    })
}

usuariosModel.Activar = function(post, responder){

    Mymodel.updateOne({email:post.email, codigo:post.codigo},{
        estado:"Activo"
    }).then((respuesta) => {

        return responder(respuesta)
 
    }).catch((error) => {
        console.log(error)
        return responder({state:false})
    })

}

module.exports.usuariosModel = usuariosModel