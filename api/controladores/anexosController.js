var anexosController = {}
var multer = require("multer")
const path = require("path")

anexosController.Upload = function(request, response){

var upload = multer ({
    storage:multer.diskStorage({
       destination:(req, file, cb) => {
        cb(null, appRoot + '/Imagenes/')
       },
       filename:(req, file, cb) => {
        cb(null,req.params.nombrearchivo + '.png' )
       }
    }),
    fileFilter: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        if(ext !== '.png'&& ext !== '.jpg' &&  ext !== '.tif' &&  ext !== '.jpeg '){

             cb('Solo soporto formatos de imagen', null)
        }
        else{
            cb(null,true)
        }
        
    }
}).single('file')

upload(request, response, function(err) {
    if(err){
        console.log(err)
        response.json({state:false, mensaje:err})
    }
    else{
        response.json({state:true, mensaje:"Archivo cargado correctamente"})
    }
})

}

anexosController.Avatar = function(request, response){

    var upload = multer ({
        storage:multer.diskStorage({
           destination:(req, file, cb) => {
            cb(null, appRoot + '/Avatar/')
           },
           filename:(req, file, cb) => {
            cb(null,req.params.nombrearchivo + '.png' )
           }
        }),
        fileFilter: (req, file, cb) => {
            var ext = path.extname(file.originalname)
            if(ext !== '.png' && ext !== '.jpg' &&  ext !== '.tif' &&  ext !== '.jpeg'){
    
                 cb('Solo soporto formatos de imagen', null)
            }
            else{
                cb(null,true)
            }
            
        }
    }).single('file')
    
    upload(request, response, function(err) {
        if(err){
            console.log(err)
            response.json({state:false, mensaje:err})
        }
        else{
            response.json({state:true, mensaje:"Archivo cargado correctamente"})
        }
    })
    
    }
module.exports.anexosController = anexosController