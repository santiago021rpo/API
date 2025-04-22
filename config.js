var config = {
    email:{},
    sesiones:{}
}

config.urlreal = "https://santiagodelgado.johncastiblanco.lat"

config.puertoexpress = 3000
config.bd = "EjercicioApi"
config.bdtest = "IberoTest"

config.bd = "BackendBit" //nombre bd mongo
config.bdUser = "adminBit"
config.bdPass = "admin123"
config.bdIp = "146.190.40.42"
config.bdPort = "27017"

config.secret = "s87af723f78hdhq8s7duqsnusn919329%%@%#"

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "santiagorpo021@gmail.com"
config.email.pass = "wlchojaiixdvvphi"

config.sesiones.secret = "topacio"
config.sesiones.expiracion = 60000 * 5

config.listablanca = [
    "http://localhost:4200",
    "http://localhost:9876",
    "undefined",
    "http://localhost:3000"
]

module.exports.config = config