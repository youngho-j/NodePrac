const router = require("express").Router();

const conn = require("../db/database");

router.get("/", function(req, res){
    conn.query(
        `select * from board order by No desc`,
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL Error");
            }else{
                res.render("main.ejs", {
                    list : result
                });
            }
        }
    )
});

router.get("/add", function(req, res){
    res.render("add.ejs");
});

router.post("/add", function(req, res){
    let input_title = req.body._title;
    let input_content = req.body._content;
    let input_writer = req.body._writer;
    conn.query(
        `insert into board(Title, Content, Writer) values(?, ?, ?)`,
        [input_title, input_content, input_writer],
        function(err, result){
            if(err){
                console.log(err);
                res.redirect("/board");
            }else{
                res.redirect("/board");
            }
        }
    )
});

module.exports = router;