const express = require('express');
const {create} = require("express-handlebars");
require('dotenv').config()
require('./database/db');

const app = express();

// mongo user : new-user / pass: yQmfg5o3MR6FVaL4

// mongodb+srv://new-user:<password>@cluster0.zxahya9.mongodb.net/?retryWrites=true&w=majority

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");


app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));
app.use("/", require('./routes/home'));
app.use("/auth", require('./routes/auth'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('servidor andando 👌'));