var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var config = require("../../config.js").config
var usuariosController = {}
var nodemailer = require("nodemailer")

usuariosController.Registrar = function(request, response){

    var post = {
        email:request.body.email,
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        password:request.body.password
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"el campo email es obligatorio", state: false})
        return false
    }

    if(post.nombre == "" || post.nombre == undefined || post.nombre == null){
        response.json({mensaje:"el campo nombre es obligatorio", state: false})
        return false
    }

    if(post.apellido == "" || post.apellido == undefined || post.apellido == null){
        response.json({mensaje:"el campo apellido es obligatorio", state: false})
        return false
    }

    if(post.password == "" || post.password == undefined || post.password == null){
        response.json({mensaje:"el campo password es obligatorio", state: false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"el correo electronico no es valido", state: false})
        return false
    }

    if(post.nombre.length < 3){
        response.json({mensaje:"El nombre es muy corto", state: false})
        return false
    }

    if(post.nombre.length > 20){
        response.json({mensaje:"El nombre es muy largo", state: false})
        return false
    }

    post.password = SHA256(post.password + config.secret)

    var letras = ["X", "A", "U", "H"]
    var posicionaleatoria = Math.ceil(Math.random() * (3 - 0) + 0)
    var micodigo = letras[posicionaleatoria] + "-" + Math.ceil(Math.random() * (9999 - 1000) + 1000)
    post.codigo = micodigo

    post.estado = "Inactivo"


    usuariosModel.verPosicionEmail(post, function(existe){
        if(existe.length == 0){

            usuariosModel.Registrar(post,function(respuesta){
                if(respuesta.state == true){

                //envio de correo

                const transporter = nodemailer.createTransport({
                    host:config.email.host,
                    port:config.email.port,
                    secure:false,
                    requireTLS:true,
                    auth:{
                        user:config.email.user,
                        pass:config.email.pass
                    }
                })

                var mailOptions = {
                    from:config.email.user,
                    to:post.email,
                    subject:"Activar Cuenta con el codigo " + post.codigo,
                    html:`<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">

    <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 400px; text-align: center;">
        <h2 style="color: #333;">Activación de Cuenta</h2>
        
        <!-- Información del Usuario -->
        <ul style="list-style-type: none; padding: 0; font-size: 16px; color: #555; text-align: left; margin: 20px 0;">
            <li>${post.email}</li>
            <li>${post.codigo}</li>
        </ul>

        <!-- Botón de activación -->
        <a href="http://localhost:4200/activar/${post.email}/${post.codigo}" <button style="width: 100%; padding: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; font-size: 16px;">
            Activar cuenta </a>
        </button>

        <div style="margin-top: 15px; font-size: 14px; color: #777;">
            <p>¿Ya activaste tu cuenta? <a href="http://localhost:4200/activar/${post.email}/${post.codigo}" style="color: #4CAF50; text-decoration: none;">Haz clic aquí para activar de nuevo</a></p>
        </div>
    </div>

</body>`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log(info)
                    }
                })

                    response.json({state:true, mensaje:"Usuario guardado correctamente"})
                }
                else{
                    response.json({state:false, mensaje:"Se presento un error al guardar el usuarios"})
                }
            })
        }
        else{
            response.json({state:false, mensaje:"Este correo ya esta registrado"})
        }
})

   

}
usuariosController.Login = function(request, response){

    var post = {
        email:request.body.email,
        password:request.body.password
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"el campo email es obligatorio", state: false})
        return false
    }

    if(post.password == "" || post.password == undefined || post.password == null){
        response.json({mensaje:"el campo password es obligatorio", state: false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"el correo electronico no es valido", state: false})
        return false
    }

    post.password = SHA256(post.password + config.secret)

    usuariosModel.Login(post,function(respuesta){
            if(respuesta.length == 0){
                response.json({state:false,mensaje:"Credenciales invaldias"})
            }
            else{
                if(respuesta[0].estado == 'Inactivo'){
                    response.json({state:false,mensaje:"Por favor activar la cuenta con el codigo de su correo"})
                }
                else{
                    
                    request.session.nombre = respuesta[0].nombre + " " + respuesta[0].apellido
                    request.session._id = respuesta[0]._id
                    request.session.perfil = respuesta[0].perfil

                    response.json({state:true,mensaje:"Bienvenido: " + respuesta[0].nombre + " " + respuesta[0].apellido})
                }
            } 
           
    })

   

}
usuariosController.Actualizar = function(request, response){

    var post = {
        email:request.body.email,
        nombre:request.body.nombre,
        perfil:request.body.perfil,
        apellido:request.body.apellido,
        estado:request.body.estado,

    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"el campo email es obligatorio", state: false})
        return false
    }

    if(post.nombre == "" || post.nombre == undefined || post.nombre == null){
        response.json({mensaje:"el campo nombre es obligatorio", state: false})
        return false
    }

    if(post.perfil == "" || post.perfil == undefined || post.perfil == null){
        response.json({mensaje:"el campo perfil es obligatorio", state: false})
        return false
    }

    if(post.apellido == "" || post.apellido == undefined || post.apellido == null){
        response.json({mensaje:"el campo apellido es obligatorio", state: false})
        return false
    }

    if(post.estado == "" || post.estado == undefined || post.estado == null){
        response.json({mensaje:"el campo apellido es obligatorio", state: false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"el correo electronico no es valido", state: false})
        return false
    }

    if(post.nombre.length < 3){
        response.json({mensaje:"El nombre es muy corto", state: false})
        return false
    }

    if(post.nombre.length > 20){
        response.json({mensaje:"El nombre es muy largo",state: false})
        return false
    }

    usuariosModel.verPosicionEmail(post, function(respuesta){
        if(respuesta.length == 0){
            response.json({mensaje:"el email no existe en la bd",state:false})
            return false
        }
        else{


            usuariosModel.Actualizar(post, function(respuesta2){
                if(respuesta2.state == true){
                    response.json({mensaje:"Usuario actualizado correctamente",state:true})
                }
                else{
                    response.json({mensaje:"Se presento un error al actualizar",state:false})
                }
            })
        }
    })

}
usuariosController.Eliminar = function(request, response){

var post = {
        email:request.body.email,

    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"el campo email es obligatorio", state: false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"el correo electronico no es valido", state: false})
        return false
    }

   usuariosModel.verPosicionEmail(post, function(respuesta){

    if (respuesta.length == 0){
        response.json({mensaje:"el email no existe en la bd", state: false})
        return false
    }
    else{
        post.posicion = respuesta.posicion
        usuariosModel.Eliminar(post, function(respuesta){
            response.json({mensaje:"Usuario eliminado correctamente", state:true})
        })
     }
   })
   
}
usuariosController.Listar = function(request, response){
    usuariosModel.Listar(null,function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.ListarEmail = function(request, response){
    var post = {
        email:request.body.email,

    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"el campo email es obligatorio", state: false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"el correo electronico no es valido", state: false})
        return false
    }

    usuariosModel.verPosicionEmail(post, function(respuesta){

        if(respuesta.length == 0){
            response.json({mensaje:"el email no existe en la bd", state: false})
            return false
        }
        else{
            usuariosModel.ListarEmail(post, function(respuesta){
                response.json(respuesta)
            })
    
        }
    
    })    
   

}

usuariosController.Activar = function(request, response){

    var post = {
        email:request.body.email,
        codigo:request.body.codigo,
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"el campo email es obligatorio", state:false})
        return false
    }

    if(post.codigo == "" || post.codigo == undefined || post.codigo == null){
        response.json({mensaje:"el campo nombre es obligatorio", state:false})
        return false
    }

    usuariosModel.Activar(post, function(res){
        if(res.modifiedCount == 0){
            response.json({state:false, mensaje:"No se pudo activar la cuenta"})
        }
        else{
            response.json({state:true, mensaje:"Cuenta activada correctamente, dirigase al Login"})
        }
    })

}




module.exports.usuariosController = usuariosController