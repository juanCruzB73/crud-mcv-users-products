const {Router} = require('express');
const router = Router();
const { login,register,profile,save,access, logout}= require('../controllers/users.controllers');
const multer = require('multer');
const storage = require('../modules/storage');
const upload = multer({storage:storage('../../public/users')});
const vRegister = require("../validations/register")
const vLogin = require("../validations/login")
const isLoged = require("../middleware/isLoged")

router.get('/login', login)
router.get('/register', register)
router.get('/profile',isLoged,profile)

router.post('/save',upload.any(),vRegister,save)
router.post("/access",vLogin,access)
router.get("/logout",logout)

module.exports = router