const fs = require("fs");

const cheerio = require("cheerio");

const superagent = require("superagent");

const { hotword ,hotwordimg} = require('../../db/model/index')


const Creeper = require("../../creeper/creeper");  // creeper 用于使用爬虫获取数据


async function getData(arr) {


    let promise = new Promise((resolve,reject) => {
        
        
    superagent.post(arr[1].url)
    .set({
        "Content-Type": "application/json"
    })
    .send(arr[1].data)
.on('error', (err) => {
   throw new Error(err);
})
.timeout({
response: 5000,
deadline:60000
})
.then((res)=>{

    resolve(res);
})


    })
    

    return promise;
   
    
}



async function getHotWord (arr) {

    let obj = new Creeper(arr[0]);
    
    obj.setSaveFormat(arr[0].map);

    let data = await obj.sendData();   // 获取搜索结果

 //   console.log("在getHotWord.js第22行\n"+JSON.stringify(data));
    
    //出错原因,进去后map被改了,得深拷贝才行
    // 还有.data访问到的才是数据
    // 这循环遍历迭代有些有些问题呀
    

    for (let i of data.data) {
        
        // 判断是否数据库是否已经存在词条,如果查不到词条,那么db就是null,如果db不是null,那么说明词条已经存在数据库里
       
        
        arr[1].data.phrase = i.content;
        
       // console.log(arr[1]);

      let res = await getData(arr);

            let obj = {};
            let data = res.body.data[0];
            
          //  console.log(i.content + "\n" + JSON.stringify(data))
            
             obj.text = data.plaintext;
            obj.img = data.full_image || undefined;
            obj.name = data.term.title;
     
    //    console.log(obj);
             let { text, img, name } = obj;
             
     
             const db =  await hotword.findOne({
                 where: {
                     name:name   
                 }
             })
     
         if ( db !== null) {
        // console.log('数据已存在\n')
         continue;
     } 
     
          //  console.log( "在getHotWord.js第57行\n"+JSON.stringify(res));
     
            const item =  await hotword.create({
                article: text,
                name: name,
                type:""
               })
     
            if (img) {
                let id = item.dataValues.id; 
                const data =  await hotwordimg.create({
                    link: img,
                    hotWord_id:id
                })
            }
         
    }

}


module.exports = getHotWord;
