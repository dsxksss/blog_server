const fs = require('fs');
const path = require('path');

function listControllers(expressApp) {
    // 请确保将此路径更改为你的控制器所在的目录
    const controllersPath = path.join(__dirname, 'controllers');

    // 读取控制器目录中的所有文件
    fs.readdir(controllersPath, (err, files) => {
        if (err) {
            console.error('无法读取控制器目录:', err);
            return;
        }

        files.forEach(file => {
            // 只处理 .js 文件
            if (path.extname(file) === '.js') {
                const controller = require(path.join(controllersPath, file));
                expressApp.use(`/${file.split("Controller")[0]}`,controller);
                // 加载控制器
                console.log(`控制器[${"\033[32m"}/${file.split("Controller")[0]}${"\033[0m"}]已载入`);
            }
        });
    });
}

module.exports = listControllers;