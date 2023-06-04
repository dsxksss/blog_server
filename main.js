const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express()
const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1/BLOGDATABASE").then(() => console.log("连接数据库")).catch((err) => {
    console.log(`${err}`);
    process.exit(1);
});


app.use(express.json());
app.use(cors());

const userController = require("./userController")
const blogController = require("./blogController")
const commentController = require("./commentController")
app.use("/user",userController)
app.use("/blog", blogController)
app.use("/comment", commentController)


http.createServer(app).listen(3001);
console.log(`启动服务器`)
console.log("监听http://localhost:3001端口");