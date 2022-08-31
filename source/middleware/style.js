//TODO Middleware to send style property to views without controller

let middleware = (req, res, next)=>{
    //console.log("uri", req.path)
    let ruta = req.path.split("/").pop();
    let style = ruta.length > 1 ? ruta : "home"
    res.locals.style = style 
    return next()
}
module.exports = middleware