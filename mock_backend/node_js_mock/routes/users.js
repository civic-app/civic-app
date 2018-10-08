const express = require("express");
const expressValidator = require("express-validator");
const bcrypt = require("bcryptjs");

const passport = require("passport");
const router = express.Router();
router.use(expressValidator())

let User = require("../models/user");

router.get("/register",function(req,res){
    res.render('register')
});

router.post("/register",function(req,res){
    req.checkBody("name","name is required").notEmpty();
    req.checkBody("email","email is required").notEmpty();
    req.checkBody("email","Has to be a real email").isEmail();
    req.checkBody("username","v is required").notEmpty();
    req.checkBody("password","password is required").notEmpty();
    req.checkBody("password2","password and check password must be the same").notEmpty(req.body.password2);
    let errors= req.validationErrors();
    if(errors){
        res.render("register",{
            errors:errors
        })
    }else{
        let newUser = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            username: req.body.username,
        });
       bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(newUser.password, salt ,function(err,hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;  
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash("success","You are now registed and can now login");
                        res.redirect("/users/login");
                    }
                });              
            });
       });
    }

})

router.get("/login",function(_,res){
    res.render("login")
})

router.post("/login",function(req,res,next){
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req,res,next);

})
router.get("/logut",function(req,res){
    req.logout();
    res.render("/users/login")
})
module.exports = router;