//const mysql = require('mysql');
const { isDev , isProd} = require('../utils/env');

let conf;

if(isProd){


 conf = {
    host: "localhost",
    user: "root",
    password: "newpassword",
    database: "easy_understand",
    port: '3306'
 }

}

if(isDev){
    conf = {
       host: "106.52.13.151",
       user: "root",
       password: "newpassword",
       database: "easy_understand",
       port: '3306'
    }
   
   }

 
module.exports = conf;