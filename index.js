const express = require("express");
const session = require("express-session");
const session_config = require('./config/session.json');
const MemoryStore = require("memorystore")(session);
const user = require("./routes/user");
const board = require("./routes/board");

const app = express();

const sessionObj = {
  secret: session_config.secret,
  resave: false,
  saveUninitialized : true,
  store : new MemoryStore({checkPeriod: session_config.maxAge}),
  cookie: {
    maxAge: session_config.maxAge
  }
};

app.use(session(sessionObj));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", function(req, res){
    console.log("처음 정보 : " + JSON.stringify(req.session));
    res.redirect("/board");
});

const port = 3000;
app.listen(port, function(){
    console.log("서버 실행 Port : " + port);
});

app.use("/login", user);
app.use("/board", board);