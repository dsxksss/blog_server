const express = require('express');
const cors = require('cors');
const dbInit = require("./db/dbInit");
const http = require('http');
const app = express()

dbInit(app)
http.createServer(app).listen(3001);
console.log(`启动服务器.......成功`)

//数据转换成req.body的JSON
app.use(express.json());
//解决跨域问题
app.use(cors());

app.use('/users', require("./controller/userController"));
app.use('/bolgs', require("./controller/blogController"));
app.use('/comments', require("./controller/commentController"));