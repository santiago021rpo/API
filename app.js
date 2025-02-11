var express = require("express")
global.app = express()
var config = require("./config.js").config


var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var mongoose = require("mongoose")
global.SHA256 = require("sha256")

require("./rutas.js")

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
    console.log("Conexion Correcta a Mongo")
}).catch((error) => {
    console.log(error)
})



app.use("/",express.static(__dirname + "/Pagina"))


app.listen(config.puertoexpress, function(){
    console.log("servidor funcionando por el puerto " + config.puertoexpress)
})