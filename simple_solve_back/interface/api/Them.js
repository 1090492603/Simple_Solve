const fs = require("fs");

const cheerio = require("cheerio");

const superagent = require("superagent");

const {banner } = require('../../db/model/index')

async function sendData(data) {
    
    let promise = new Promise((resolve,reject) => {
      

        superagent.get(data.url)
        .query(data.data)
        .on("erron", (err) => {
        reject(err);
        })
        .timeout({
            response: 5000,
            deadline:60000
            })
            .then((res) => {
                
                let arr = [];
            
                let data = res.body.data;


                for (let i of data) {
                    
                    let obj = {}

                    obj.img = i.banner;
                    
                    obj.title = i.title;

                    obj.article = i.introduction;

                    arr.push(obj);
                }

                resolve(arr);
        })

  })
    
return promise;

}


async function getThem(arr) {
    
    for (let i = 100; i >= 0 ;){
        
        arr[0].data.offset = i;
    

    let data = await sendData(arr[0]);

        for (let i of data) {
        
            console.log(i);
            
        let { title, article, img } = i;

        let jude = await banner.findOne({
            where: {
                link:img
            }
        })

        if (jude !== null) {
            continue;
        }

      let db  =  await banner.create({
            link: img,
            content: article,
            title:title
        })
    }

        i = i - 10;

    }
 
}

module.exports = getThem;