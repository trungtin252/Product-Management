const express = require("express")
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require("cookie-parser")
const session = require('express-session')
require('dotenv').config()
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');




mongoose.plugin(slug);


const routeClient = require('./routes/client/index.route.js');
const routeAdmin = require('./routes/admin/index.route.js');

const app = express()
var port = process.env.PORT


app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// connect to db
const db = require("./config/database.js");
db.connect();


// Using pug premary
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Flash config
app.use(cookieParser('KAKAKAWYWTWTAADDNS'));
app.use(session({
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// use routes
routeClient(app);
routeAdmin(app);

// SystemConfig
const systemConfig = require('./config/system.js');
// Define locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;





// Stactic file folder
app.use(express.static(`${__dirname}/public`))




app.listen(port, () => {
    console.log(`App listening on port ${port} !`);
})