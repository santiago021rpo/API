const productosController = require("./productosController").productosController
global.SHA256 = require("sha256")
var mongoose = require("mongoose")
var productosModel = require("../../api/modelos/productosModel.js").productosModel
var config = require("../../config.js").config

describe("POST: /productos/Guardar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la bd

                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {

                }).catch((error) => {
                    console.log(error)
                })
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
       
    })

    test("Debe fallar cuando el codigo no este presente",(done) => {
        //configurar request
        request.body = {}
        productosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo codigo es obligatorio",state:false})
        done()
    })

    test("Debe fallar cuando el nombre no este presente",(done) => {
        //configurar request
        request.body = {codigo:"01"}
        productosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo nombre es obligatorio",state:false})
        done()
    })

    test("Debe fallar cuando la descripcion no este presente",(done) => {
        //configurar request
        request.body = {codigo:"01", nombre:"jade"}
        productosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo descripcion es obligatorio",state:false})
        done()
    })

    test("Debe fallar cuando la imagen no este presente",(done) => {
        //configurar request
        request.body = {codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame"}
        productosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo imagen es obligatorio",state:false})
        done()
    })

    test("Debe fallar cuando el precio no este presente",(done) => {
        //configurar request
        request.body = {codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60"}
        productosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo precio es obligatorio",state:false})
        done()
    })

  test("Debe guardar el producto",(done) => {
    //configurar request
    request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9", codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
    productosController.Guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente"})
        done()
    },200)
})

// test("Debe actualizar",(done) => {
//     //configurar request
//     request.body = {codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
//     productosModel.Mymodel.findOneAndUpdate({codigo:"01"})

//     productosController.Actualizar(request, response)

//     setTimeout(()=>{
//         expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento actualizado correctamente"})
//         done()
//     },200)
// })
  
test("Debe fallar con la existencia del codigo",(done) => {
    //configurar request
    request.body = {codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
    productosController.Guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El codigo de este elemento ya existe"})
        done()
    },200)
})

// test("Borrado",(done) => {
//     productosModel.Mymodel.deleteMany({}).then((res)=> {
//     setTimeout(()=>{
//         expect("ok").toBe("ok")
//         done()
//     },200)
//    })

// })

    afterAll(()=>{
        //borrado de la coleccion
        productosModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})

describe("POST: /productos/Actualizar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la bd

                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {

                }).catch((error) => {
                    console.log(error)
                })
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
       
    })

    test("Debe fallar cuando el _id no este presente",(done) => {
        //configurar request
        request.body = {}
        productosController.Actualizar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo _id es obligatorio",state:false})
        done()
    })

    test("Debe fallar cuando el nombre no este presente",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9"}
        productosController.Actualizar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo nombre es obligatorio",state:false})
        done()
    })

    test("Debe fallar cuando el descripcion no este presente",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9", nombre:"jade"}
        productosController.Actualizar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo descripcion es obligatorio",state:false})
        done()
    })

    test("Debe fallar si el producto no existe",(done) => {
        //configurar request
        request.body = {_id:"11111", codigo:"02", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
        productosController.Actualizar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Error al actualizar el elemento"})
            done()
        },200)
    })

    test("Debe guardar el producto",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9", codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
        productosController.Guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente"})
            done()
        },200)
    })

    test("Debe actualizar el producto",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9", codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
        productosController.Actualizar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento actualizado correctamente"})
            done()
        },200)
    })

    // test("Borrado",(done) => {
    //     productosModel.Mymodel.deleteMany({}).then((res)=> {
    //     setTimeout(()=>{
    //         expect("ok").toBe("ok")
    //         done()
    //     },200)
    //    })
       
    // })

    afterAll(()=>{
        //borrado de la coleccion
        productosModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})

describe("POST: /productos/Eliminar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la bd

                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {

                }).catch((error) => {
                    console.log(error)
                })
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
       
    })

    test("Debe fallar cuando el _id no este presente",(done) => {
        //configurar request
        request.body = {}
        productosController.Eliminar(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo _id es obligatorio",state:false})
        done()
    })

    test("Debe fallar si el producto no existe",(done) => {
        //configurar request
        request.body = {_id:"11111"}
        productosController.Eliminar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Error al eliminar el elemento"})
            done()
        },200)
    })

    test("Debe guardar el producto",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9", codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
        productosController.Guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente"})
            done()
        },200)
    })

    test("Debe eliminar el producto",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9"}
        productosController.Eliminar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento eliminado correctamente"})
            done()
        },200)
    })

    // test("Borrado",(done) => {
    //     productosModel.Mymodel.deleteMany({}).then((res)=> {
    //     setTimeout(()=>{
    //         expect("ok").toBe("ok")
    //         done()
    //     },200)
    //    })
       
    // })

    afterAll(()=>{
        //borrado de la coleccion
        productosModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})

describe("POST: /productos/Listar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la bd

                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {

                }).catch((error) => {
                    console.log(error)
                })
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
       
    })

    test("Debe guardar el producto",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9", codigo:"03", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
        productosController.Guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente"})
            done()
        },200)
    })

    test("Debe validar el producto",(done) => {
        //configurar request
        request.body = {}
        productosController.Listar(request, response)
        setTimeout(()=>{

            expect(response.json.mock.calls[0][0].length).toBe(1)
            done()
        },200)
    })

    // test("Borrado",(done) => {
    //     productosModel.Mymodel.deleteMany({}).then((res)=> {
    //     setTimeout(()=>{
    //         expect("ok").toBe("ok")
    //         done()
    //     },200)
    //    })
       
    // })

    afterAll(()=>{
        //borrado de la coleccion
        productosModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})

describe("POST: /productos/ListarId", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la bd

                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {

                }).catch((error) => {
                    console.log(error)
                })
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
       
    })

    test("Debe fallar cuando el _id no este presente",(done) => {
        //configurar request
        request.body = {}
        productosController.ListarId(request, response)

        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo _id es obligatorio",state:false})
        done()
    })

    // test("Debe fallar si el producto no existe",(done) => {
    //     //configurar request
    //     request.body = {_id:"1111111"}
    //     productosController.ListarId(request, response)
    
    //     setTimeout(()=>{
    //         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Error al ListarId el elemento"})
    //         done()
    //     },200)
    // })

    test("Debe guardar el producto",(done) => {
        //configurar request
        request.body = {_id:"67ddfba8aba0bc0d8d9e6aa9", codigo:"01", nombre:"jade", descripcion:"este bolso es de macrame", imagen:"60", precio:"100"}
        productosController.Guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente"})
            done()
        },200)
    })

    test("Debe mostrar el producto",(done) => {
        //configurar request
        request.body = {}
        productosController.Listar(request, response)
        setTimeout(()=>{
            let misdatos = response.json.mock.calls[0][0]
            expect(misdatos[0].codigo).toBe("01")
            done()
        },200)
    })

    afterAll(()=>{
        //borrado de la coleccion
        productosModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})