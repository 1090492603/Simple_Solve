const fs = require("fs");

const exec = require("../db/seq");

const creeper = require("../creeper/creeper");


class InterfacesOfCreeper {

    readFile() {

        let str = fs.readFileSync("./data/data.json");
        
        let data = JSON.parse(str);
        
        for (let i in data) {
            
            let result = await this.getData(data[i])
            
            saveData(result.data);
        }

    }

    async  getData(obj) {

        let creeper = new Creeper(obj);
    
        creeper.setSaveFormat(obj.map);

        try {
          let data = await creeper.sendData();
        } catch (err) {
            console.log(err);
        }
        
            console.log(data);
        
            return data;
        
    }

    saveData(result) {

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

}

module.exports = new InterfacesOfCreeper();