const express = require("express");
const session = require("express-session");
const env = require("dotenv").config();
const MemoryStore = require("memorystore")(session);
const user = require("./routes/user");
const board = require("./routes/board");

const app = express();

app.use(
  session(
    {
      secret: process.env.secret,
      resave: false,
      saveUninitialized : true,
      store : new MemoryStore({checkPeriod: process.env.maxAge})
    }
  )
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/login", user);
app.use("/board", board);

app.get("/", function(req, res){
    if(req.session.user){
      res.redirect("/board");
    } else {
      res.redirect("/login");
    }
});

const port = 3000;
app.listen(port, function(){
    console.log("서버 실행 Port : " + port);
});