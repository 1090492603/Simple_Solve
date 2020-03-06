
require('../db/sync');

const { question, answer, answerImage, img, hotWord, comment } = require("../db/model/index");  

const Creeper = require("../creeper/creeper");  // creeper 用于使用爬虫获取数据

const fs = require("fs");

const data = fs.readFileSync("./data/data.json");   

let obj = JSON.parse(data);


async function getHotWord() {

    let creeper = new Creeper(obj.getHotWord);

    creeper.setSaveFormat(obj.getHotWord.map);

    let data = await creeper.sendData();

    console.log(data);
    
    return data;
    
}


module.exports = {
    getHotWord
}