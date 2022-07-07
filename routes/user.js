const router = require("express").Router();

// 물어보기 js 안붙여도 되는데 왜 되는건가?
// module.exports? 문데
const conn = require("../db/database");

router.post("/", function(req, res){
    var input_id = req.body._id;
    var input_pass = req.body._pass;

    conn.query(
        `select * from user_info where user_id = ? and user_pass = ?`,
        [input_id, input_pass],
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL Error");
            }else{
                if(result.length > 0){ 
                    res.redirect("/board");
                }else{
                    res.redirect("/");
                }
            }
        }
    );
});

router.get("/", function(req, res){
    res.render("signup.ejs");
});

router.post("/signup", function(req, res){
    var input_id = req.body._id;
    var input_pass = req.body._pass;

    conn.query(
        `insert into user_info values(?, ?)`,
        [input_id, input_pass],
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

module.exports = router;