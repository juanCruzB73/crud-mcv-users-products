const {Router} = require("express");
const route = Router();
const multer = require('multer');
const controller = require("../controllers/products.controller");
const storage = require('../modules/storage')
const upload = multer({storage:storage('../../public/products')});

route.get("/productos/nuevo", controller.create);

route.post("/productos/guardar", upload.any(), controller.save);

route.get("/productos/detalle/:producto", controller.show);

route.get("/productos/edit/:producto", controller.edit);

route.put("/productos/actualizar",upload.any(), controller.update)

route.get("/productos/:categoria?", controller.index);//categoria es opcional

route.delete("/productos/borrar", controller.remove);

module.exports = route;