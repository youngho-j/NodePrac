const router = require("express").Router();

const conn = require("../db/database");
const bcrypt = require("bcryptjs");

router.post("/", function(req, res){
    let input_id = req.body._id;
    let input_pass = req.body._pass;

    conn.query(
        `select * from user_info where user_id = ?`,
        [input_id],
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL Error");
            }else{
                const same = bcrypt.compareSync(input_pass, result[0].user_pass);
                if(same) {
                    req.session.user = result[0].user_id;
                    res.redirect("/board");
                } else {
                    res.redirect("/login");
                }
            }
        }
    );
});

router.get("/", function(req, res){
    if(req.session.user) {
        res.redirect("/board");
    } else {
        res.render("login.ejs");
    }
});

router.get("/signup", function(req, res){
    if(req.session.user) {
        res.redirect("/board");
    } else {
        res.render("signup.ejs");
    }
});

router.post("/signup", function(req, res){
    let encrypted_pass;
    let input_id = req.body._id;
    let input_pass = req.body._pass;

    encrypted_pass = bcrypt.hashSync(input_pass, 10);

    conn.query(
        `insert into user_info values(?, ?)`,
        [input_id, encrypted_pass],
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL Error");
            }else{
                res.redirect("/");
            }
        }
    );
});

router.get("/logout", function(req, res){
    req.session.destroy(function(err){
        if(err) {
            console.log(err);
            res.send("Session Error");
        } else {
            req.session;
            res.redirect("/");
        }
    });
});

module.exports = router;