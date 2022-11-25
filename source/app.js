const {resolve} = require('path');
const {port,start} = require('./modules/server');
const express = require('express');
const session = require("express-session")
const cookie = require("cookie-parser")
const app = express();

app.listen(port, start());
app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(resolve(__dirname,'..','public')))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"secreto",
    resave: true,
    saveUninitialized: true
}))// le añade al request la propiedad session
app.use(cookie())//añade la propiedad cookies al req y cookie al res
app.use(require("./middleware/users"))

app.use(require("./routes/main.routes"))
app.use(require("./routes/products.routes"));
app.use('/users',require('./routes/users.routes'))