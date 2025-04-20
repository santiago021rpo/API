//const { json } = require("body-parser");

const usuariosController = require("./usuariosController").usuariosController
global.SHA256 = require("sha256")
var mongoose = require("mongoose")


describe("POST: /usuarios/Login", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la bd

                mongoose.connect("mongodb://127.0.0.1:27017/IberoTest").then((respuesta) => {
                    console.log("Conexion Correcta a Mongo")
                }).catch((error) => {
                    console.log(error)
                })

        done()
    })

    beforeEach(() => {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
    })

    test("Debe fallar cuando el email no este presente", (done) => {
        //configurar request
        request.body = {}
        usuariosController.Login(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio",state: false})
        done()
    })

    test("Debe fallar cuando el password no este presente", (done) => {
        //configurar request
        request.body = {email:"1.com"}
        usuariosController.Login(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje: "el campo password es obligatorio",state: false})
        done()
    })

    test("Debe fallar cuando el email no sea valido", (done) => {
        //configurar request
        request.body = {email:"1.com", password:"123456" }
        usuariosController.Login(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje: "el correo electronico no es valido",state: false})
        done()
    })

    test("Debe entrar correctamente",(done) => {
        //configurar request
        request.body = {email:"santiagorpo021@gmail.com", password:"123456"}
        usuariosController.Login(request, response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Bienvenido"})
            done()
        },10)   
    })

    

})