const {all, one, generate, write} = require("../models/products.model");
const {unlinkSync} = require("fs");
const {resolve} = require("path")

const controller =  {
    index: (req, res) => { //siempre va return

        let products = all();

        if(req.params.categoria){
            products = products.filter(e => e.categoria == req.params.categoria)
            return res.render("products/list",{products})
        }
        return res.render("products/list",{products})
   },
   show: (req, res) =>{
    let product = one(req.params.producto)
    if(product){
        return res.render("products/detail",{product})
    }
    return res.render("products/detail",{product:null})
   },
   create: (req, res) => {
    return res.render("products/create")
   },
   save: (req, res) => {
    req.body.img = req.files && req.files.length > 0 ? req.files[0].filename : "default.png"
    let nuevo = generate(req.body)//forma un recurso; objeto lit para base de datos
    let todos = all();
    todos.push(nuevo);
    write(todos)
    return res.redirect("/productos")
   },
   edit: (req, res) => {
    let product = one(req.params.producto)
    return res.render("products/edit", {product})
   },
   update: (req, res) => {
    let todos = all();
    let actualizados = todos.map(element => {
        if(element.id == req.body.id){
            element.name = req.body.name;
            element.price = parseInt(req.body.price);
            element.categoria = req.body.categoria
            element.img = req.files && req.files.length > 0 ? req.files[0].filename : element.img
        }
        return element
        
    })
    write(actualizados);
    return res.redirect("/productos")
   },
   remove: (req, res)=>{
    let product = one(req.body.id)
    if(product.img != "default.png"){
        let file = resolve(__dirname, "..","..","public","products", product.img)
        unlinkSync(file)
    }
    let todos = all();
    let noElimindos = todos.filter(element => element.id != req.body.id)
    write(noElimindos);
    return res.redirect("/productos")
   }
}
module.exports = controller