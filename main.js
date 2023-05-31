const express = require('express');
const cors = require('cors');
const dbInit = require("./db/dbInit");
const http = require('http');
const registerControllers = require('./registerControllers');
const app = express()

// 初始化数据库
dbInit()

//数据转换成req.body的JSON
app.use(express.json());
//解决跨域问题
app.use(cors());

// 自动加载controllers文件夹内的控制器
registerControllers(app)

http.createServer(app).listen(3001);
console.log(`启动服务器.......成功`)