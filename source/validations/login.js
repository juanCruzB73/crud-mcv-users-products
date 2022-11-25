const {body} = require("express-validator");
const {index} = require("../models/users.model")
const {compareSync} = require('bcrypt');

let email = body("email").notEmpty().withMessage("email no valido").bail()
.isEmail().custom((value,{req})=>{
    let users = index()
    let listOfEmail = users.map(user => user.email)
    if(listOfEmail.indexOf(value) == -1 ){
        throw new Error ("usuario no encontrado")
    }
    return true
})
let password = body("password").notEmpty().withMessage("contraseña no valida").bail().
isLength({min:5}).withMessage("minimo 4 caracteres").custom((value,{req})=>{
    let users = index()
    let result = users.find(user => user.email == req.body.email)
    if(!result){
        throw new Error ("credenciales invalidas")
    }
    if(!compareSync(value,result.password)){
        throw new Error ("contraseña no coincide")
    }
    return true
})

let validaciones = [email, password]

module.exports = validaciones