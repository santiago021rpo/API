var express = require("express")
global.app = express()
var config = require("./config.js").config


var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var mongoose = require("mongoose")
global.SHA256 = require("sha256")
const cors = require("cors")
const session = require("express-session")
global.multer = require("multer")
global.path = require('path')
global.appRoot = path.resolve(__dirname)



app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});


// mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
//     console.log("Conexion Correcta a Mongo")
// }).catch((error) => {
//     console.log(error)
// })

mongoose.connect("mongodb://" + config.bdUser + ":" + config.bdPass + '@' + config.bdIp + ":" + config.bdPort +  "/" + config.bd).then((respuesta)=>{
    console.log("Conexion correcta a mongo")
}).catch((error) => {
    console.log(error)
})




app.use(cors({
    origin: function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.listablanca.indexOf(origin) ==-1){
            return callback("error cors sin permiso", false)
        }
        else{
            return callback(null, true)
        }
    }
}))

app.use(session({
    secret:config.sesiones.secret,
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:config.sesiones.expiracion,httpOnly:true
    },
    name:"CookieApp",
    rooling:true
}))

require("./rutas.js")

console.log("hola mundo")

app.use("/Avatar",express.static(__dirname + "/Avatar"))
app.use("/Imagenes",express.static(__dirname + "/Imagenes"))

app.use('/', express.static(__dirname + '/dist/frontend/browser'));

app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + "/dist/frontend/browser/index.html"));
});



app.listen(config.puertoexpress, function(){
    console.log("servidor funcionando por el puerto " + config.puertoexpress)
})