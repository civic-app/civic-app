const express = require("express");
const expressValidator = require("express-validator");

const router = express.Router();
router.use(expressValidator())
let Model = require("../models/model")


router.get("/add", function (req,res){
    res.render( "add_model", {"title": "Add Model"}
    );
})

router.post('/add',function (req, res) {
    req.checkBody('title',"Title is required").notEmpty();
    req.checkBody('author',"author is required").notEmpty();
    req.checkBody('body',"body is required").notEmpty();
    let errors = req.validationErrors();
    if(errors){
        res.render("add_model",{
            "title":"Add Model",
            errors: errors
        })
    } else{
    let model = new Model();
    model.title = req.body.title;
    model.author = req.body.author;
    model.body = req.body.body;
    model.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            req.flash("success","model Added")
            res.redirect("/");
        }
    })
    }
    
});


router.get("/edit/:id",function(req,res){
    Model.findById(req.params.id,function(err,model){
        if(err){
            console.log(err)
            return;
        }else{
        res.render("edit_model",
            {model:model});
        }
    });
});

router.post('/edit/:id',function(req,res){
    let model = {};
    model.title = req.body.title;
    model.author = req.body.author;
    model.body = req.body.body;
    let query = {_id: req.params.id};
    console.log("updated " + req.params.id)
    Model.updateOne(query,model,function(err){
        if(err){
            console.log(err);
            return;
        }else{
            req.flash("success","Model Updated")
            res.redirect("/");
        }
    })
});

router.delete("/:id",function(req,res){
    let query= {_id: req.params.id}
    Model.deleteOne(query,function(err){
        if(err){
            console.err.log(err);
            return;
        }else{
            res.send("Sucess")
        }
    })
})

router.get("/:id",function(req,res){
    Model.findById(req.params.id,function(err,model){
        if(err){
            console.log(err)
            return;
        }else{
            // res.send("tst")
        res.render("model",
            {model:model});
        }
    });
});

module.exports = router