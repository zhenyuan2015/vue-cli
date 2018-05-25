const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()

var returnFactory = require('../utils/returnFactory');
// var user_tDao = require('../dao/user_t');  // 需要修改为正确的dao层
// var userDao = requireDao('user');  // 需要修改为正确的dao层
var fs = require('fs-extra');
var path = require('path');
var setting = require('../config/setting');
var processCwd = __dirname; // 脚本 根目录


module.exports = function(app){
    // var router = app.Router;
    var codePath = setting.CODE_PATH
    if(!codePath){
        codePath = path.resolve(process.cwd())
    }
    console.log('codePath,',codePath)
    var allFiles = fs.readdirSync(path.resolve(process.cwd()));
    allFiles.forEach(function(file){
        if(file.endsWith(".json")){
            try{
                app.use(jsonServer.router(path.join(codePath, file)))
            }
            catch(e){
                console.log('err:',e," when add router for:",path.join(codePath, file))
            }
        }
    })
};
