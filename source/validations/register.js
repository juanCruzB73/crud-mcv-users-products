const {body} = require("express-validator");

let email = body("email").notEmpty().withMessage("email no puede estar vacio").bail().isEmail().withMessage("email invalido")
let password = body("password").notEmpty().withMessage("contraseña no puede estar vacia").bail().isLength({min:5}).withMessage("minimo 4 caracteres")

let validaciones = [email,password]

module.exports = validaciones