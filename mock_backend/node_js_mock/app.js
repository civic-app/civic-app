const express = require("express");
const path = require("path")
const port = 3000;
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session")
const flash = require('connect-flash');
const config = require("./config/database")
const passport = require("passport")
const nunjunks = require("nunjucks")

let mongoose = require('mongoose');
mongoose.connect(config.database,{ useNewUrlParser: true } );
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {  console.log("connected to mongodb")});


const app = express();

app.set('views',path.join(__dirname,"views"))
app.set("view engine","pug")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'static')));    
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/')); // redirect CSS bootstrap

app.use(session({
    secret: "Test",
    resave: true,
    saveUninitialized: true,
}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

require("./config/passport")(passport)
app.use(passport.initialize());
app.use(passport.session());
nunjunks.configure("views",{
    autoescape: true,
    express: app
})




let Model = require("./models/model")
let User = require("./models/user")
app.get("*",function(req,res){
    res.locals.user = req.user | null;
    next();
});

app.get("/",function(req,res){
    Model.find({},function(err,models){
        if(err){
            console.log(err);
        }else{
            res.render("index",
            {
                title:"Models",
                models:models}
            );
        }
    }); 
});
app.use("/models",require("./routes/model"))
app.use("/users",require("./routes/users"))

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("danger","Please Login");
        res.redirect("/users/login")
    }
}
app.listen(port, function(){
    console.log("Server started at 3000...")
});

