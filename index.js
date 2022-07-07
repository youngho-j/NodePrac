const express = require("express");
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", function(req, res){
    res.render("login.ejs")
});

const port = 3000;
app.listen(port, function(){
    console.log("서버 실행 Port : " + port);
});

const user = require("./routes/user");
app.use("/login", user);
const board = require("./routes/board");
app.use("/board", board);