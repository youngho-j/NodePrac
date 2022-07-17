const router = require("express").Router();

const conn = require("../db/database");

router.get("/", function(req, res){
    let sql = "select * from board order by No desc"
    if(req.session.user){
        conn.query(
            sql,
            function(err, result){
                if(err){
                    console.log(err);
                    res.send("SQL Error");
                }else{
                    if(result.length > 0) {
                        let pageNum = req.query.page;
                        const viewPerPage = 3;
                        const pageGroup = 5;
                        let totalCount = result.length;
                        let offset;
                        
                        if(pageNum == "" || pageNum == undefined || pageNum <= 0) {
                            pageNum = 1;
                        }
                        
                        const totalPageGroup = Math.ceil(totalCount / viewPerPage);
                        const curPageGroup = Math.ceil(pageNum / pageGroup);
                        const firstPageInGroup = pageNum - (pageNum - 1) % pageGroup;
                        const lastPageInGroup = firstPageInGroup + (pageGroup - 1);
                        
                        if(pageNum < 0) {
                            offset = 0;
                        } else {
                            offset = (pageNum - 1) * viewPerPage;
                        }

                        const pagingData = {
                            "pageNum": pageNum,
                            "totalPageGroup": totalPageGroup,
                            "firstPageInGroup": firstPageInGroup,
                            "lastPageInGroup": lastPageInGroup
                        };

                        sql += " limit " + offset + "," + viewPerPage + "";
                        console.log("쿼리문 : " + sql);
                        conn.query(
                            sql,
                            (err, result2) => {
                                if(err) {
                                    console.log(err);
                                    res.send("SQL Error");
                                } else {
                                    res.render("main.ejs", {
                                        list : result2,
                                        user : req.session.user,
                                        pagingData : pagingData
                                    });
                                }
                            } 
                        )
                    } else {
                        res.render("main.ejs", {
                            list : result,
                            user : req.session.user
                        });
                    }
                }
            }
        )
    } else {
        res.redirect("/login");
    }
});

router.get("/add", function(req, res){
    if(req.session.user) {
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
    if(req.session.user) {
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
    } else {
        res.send("<script>alert('로그인 후 이용이 가능합니다.');location.href='/login';</script>");
    }
});

router.get("/delete", function(req, res){
    if(req.session.user) {
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
    } else {
        res.send("<script>alert('로그인 후 이용이 가능합니다.');location.href='/login';</script>");
    }
});

router.get("/modify", function(req, res){
    if(req.session.user) {
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
    } else {
        res.send("<script>alert('로그인 후 이용이 가능합니다.');location.href='/login';</script>");
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