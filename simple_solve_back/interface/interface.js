const fs = require("fs");

const exec = require("../db/seq");

const Creeper = require("../creeper/creeper");  // creeper 用于使用爬虫获取数据

const data = fs.readFileSync("./data/data.json");   

let obj = JSON.parse(data);

const getHotWord = require("./api/getHotWord"); // 热词从小鸡词典上爬

const getHotStem = require("./api/getHotStem"); // 热梗从流行语百科和犯贱志上爬

const getQA = require("./api/QA");  // 问答从知乎上爬

const getThem = require("./api/Them");  // 专题轮播图从知乎上爬

const getTechnology = require("./api/technology")   //科技从知乎的5g专题上爬

class InterfacesOfCreeper {

    constructor() {

        let str = fs.readFileSync("./data/data.json");
        
        let data = JSON.parse(str);
        
        for (let i in data) {
            
            switch ( i ) {
               /*  
                case "getHotWord":
                    getHotWord(data[i]);
                    break; */

              /*   case "getHotStem":
                    getHotStem(data[i]);
                    break; */
                case "getQA":
                    getQA(data[i]);
                    break;
               /*  case "getThem":
                    getThem(data[i]);
                    break; */
                case "getTechnology":
                    getTechnology(data[i]);
                        break;

            }


        }

    }

    /* async  getData(obj) {

        let creeper = new Creeper(obj);
    
        creeper.setSaveFormat(obj.map);

        try {
          let data = await creeper.sendData();
        } catch (err) {
            console.log(err);
        }
        
            console.log(data);
        
            return data;
        
    } */

 /*    saveData(result) {

         for (let i of result) {
            
         let sql = `select exists(select 1 from hotword where name = ${i.content}) ;`

            exec(sql)
                .then((data) => {
                    if (data == 0) {
                        let sql = `insert into hotword (name,heat,description,article,type) values (${i.content},10000,"","","");`
                       return exec(sql)
                     }
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                console.log(err)
            })

        }
        
        
    }
 */
}

module.exports =  InterfacesOfCreeper ;