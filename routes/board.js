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
                console.log("이거 무슨값 : " + req.session.user)
                res.render("main.ejs", {
                    list : result,
                    user : req.session.user
                });
            }
        }
    )
});

router.get("/add", function(req, res){
    if(req.session.user !== undefined) {
        res.render("add.ejs");
    } else {
        res.send("<script>alert('로그인 후 이용이 가능합니다.');location.href='/login';</script>");
    }
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

router.get("/detail", function(req, res){
    if(req.session.user === undefined) {
        res.send("<script>alert('로그인 후 이용이 가능합니다.');location.href='/login';</script>");
    } else {
        let update_no = req.query._no;
    
        conn.query(
            `select * from board where No = ?`,
            [update_no],
            function(err, result){
                if(err){
                    console.log(err);
                    res.redirect("/board");
                }else{
                    res.render("detail.ejs", 
                        {
                            detail : result
                        }
                    );
                }
            }
        )
    }
});

router.get("/delete", function(req, res){
    if(req.session.user === undefined) {
        res.send("<script>alert('로그인 후 이용이 가능합니다.');location.href='/login';</script>");
    } else {
        let update_no = req.query._no;
    
        conn.query(
            `delete from board where No = ?`,
            [update_no],
            function(err){
                if(err){
                    console.log(err);
                    res.redirect("/board");
                }else{
                    res.redirect("/board");
                }
            }
        )
    }
});

router.get("/modify", function(req, res){
    if(req.session.user === undefined) {
        res.send("<script>alert('로그인 후 이용이 가능합니다.');location.href='/login';</script>");
    } else {
        let update_no = req.query._no;
    
        conn.query(
            `select * from board where No = ?`,
            [update_no],
            function(err, result){
                if(err){
                    console.log(err);
                    res.redirect("/board");
                }else{
                    res.render("modify.ejs", 
                        {
                            modify : result
                        }
                    );
                }
            }
        )
    }
});

router.post("/modify", function(req, res){
    let update_no = req.body._no;
    let update_title = req.body._title;
    let update_content = req.body._content;
    let update_writer = req.body._writer;

    conn.query(
        `update board set Title = ?, Content = ?, Writer = ? where No = ?`,
        [update_title, update_content, update_writer, update_no],
        function(err) {
            if(err){
                console.log(err);
                res.redirect("/board");
            }else{
                res.redirect("/board/detail?_no=" + update_no);
            }
        }
    )
});

module.exports = router;