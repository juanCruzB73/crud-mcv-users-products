const {body} = require("express-validator");

let email = body("email").notEmpty().withMessage("email no valido").bail().isEmail()
let password = body("pasword").notEmpty().withMessage("contraseña no valida").bail().isLength({min:5}).withMessage("minimo 4 caracteres")

let validaciones = [email, password]

module.exports = validaciones