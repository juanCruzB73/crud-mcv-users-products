const {resolve} = require('path');
const {port,start} = require('./modules/server');
const express = require('express');
const app = express();
const methodOverride = require("method-override")

app.listen(port, start());
app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(resolve(__dirname,'..','public')))
app.use(express.urlencoded({extended:true}))
app.use(require("./middleware/style"))
app.use(require("./routes/main.routes"))
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("m"))

app.use(require("./routes/products.routes"));
app.use('/users',require('./routes/users.routes'))