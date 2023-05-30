const mongoose = require("mongoose"); //操纵MongoDB数据库的库

async function dbInit() {
    //MongoDB数据库连接
    mongoose
        //先连接这个数据库表
        //如果没有的话就创建这个表
        .connect("mongodb://localhost/blog")
        .then(() => console.log("连接数据库.......成功"))
        .catch((err) => {
            console.log(`Could not connect to dataBase [ ${err} ] !!!`);
            process.exit(1);
        });
}

module.exports = dbInit;