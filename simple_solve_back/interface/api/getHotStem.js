const fs = require("fs");

const cheerio = require("cheerio");

const superagent = require("superagent");

const { hotstem, stemimg } = require('../../db/model/index')

const Creeper = require("../../creeper/creeper"); 


let a = "https://www.lxybaike.com/";

async function getdata (routeUrl){

    let link = a + routeUrl;

   let promise =  new Promise((resolve, reject) => {
        

       superagent.get(link)
       .timeout({
        response: 5000,
        deadline:60000
    })
       .on('error', (err) => {
            
        reject(err);

         })
         .then((res) => {

             try {
                         let $ = cheerio.load(res.text);   
                 
                        let obj = {}
                    
               obj.article =  $(".content_topp").text()
              obj.img = a + $(".content_topp div a").attr("href");

                resolve(obj);


                    } catch (err) {
                        
                        reject(err);
                    }

                })


    })

    return promise;
    
}


async function sendData (url){

    let link = url;

   let promise =  new Promise((resolve, reject) => {
        

       superagent.get(link)
       .timeout({
        response: 5000,
        deadline:60000
    })
           .set({
               "user-agent":'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
           })
           .on('error', (err) => {
            
               reject(err);

                })
                .then((res) => {

                    let $ = cheerio.load(res.text);   

                    let obj = {}
                    
                    $(".ui-article-topapps").remove();
                    
                    obj.type = $(".ui-article-text >p").text();

                    
                    obj.article = $(".ui-article-text").html();

                    obj.img = $(".ui-article-text p img").attr('src');

                    console.log(obj);

                    resolve(obj);

                })

    })

    return promise;
    
}



async function getHotStem (arr) {

   // console.log("110");


    


    /* let obj = new Creeper(arr[1]);
    
     obj.setSaveFormat(arr[1].map);

    let data = await obj.sendData();
    
  //  console.log(JSON.stringify(data));

    for (let i of data.data) {

        console.log(i);

        let obj;
        try {
          
            obj = await sendData(i.src);
            
        } catch (err) {
           
            console.log(err);
             continue;
      }
       
        
        let { type, img, article } = obj;
             
     
        const db =  await hotstem.findOne({
            where: {
                name:i.content   
            }
        })

    if ( db !== null) {
   // console.log('数据已存在\n')
    continue;
} 

     //  console.log( "在getHotWord.js第57行\n"+JSON.stringify(res));

       const item =  await hotstem.create({
           article: article,
           name: i.content,
           type:type
          })

       if (img) {
           let id = item.dataValues.id; 
           const data =  await stemimg.create({
               link: img,
               hotStem_id:id
           })
       }
        

    } */

    let url = arr[0].url

    console.log(arr[0].url)

    for (let num = 5; num >= 1; num--){

        let data;

        try{

  arr[0].url = url;

        arr[0].url = arr[0].url + num + '.html'

        let obj = new Creeper(arr[0]);
    
    obj.setSaveFormat(arr[0].map);

         data = await obj.sendData();   // 获取搜索结果

        } catch (err) {
            console.log(err);
            continue;
        }
            
      
        
    
      //  console.log(data);

   // console.log("getHotStem.js第28行\n"+JSON.stringify(data));
    
    //出错原因,进去后map被改了,得深拷贝才行
    // 还有.data访问到的才是数据
    // 这循环遍历迭代有些有些问题呀
    
 
    for (let i of data.data) {
        
      /*   obj.setRouterUrl(i.src);
        obj.setSaveFormat({
            data: [{
                content: ".content_topp",
                src:".content_topp div a"
            }]
        })
        let list = await obj.sendData();
        
        console.log("第53行"+list.data) */
    
        let list;
        try {
            
             list = await getdata(i.src);
        } catch (err) {
            
            console.log(err);
            continue;

        }

        list.name = i.content

        console.log("第53行" + JSON.stringify(list))
        
        let {  img, article,name } = list;
             
     
        const db =  await hotstem.findOne({
            where: {
                name:name   
            }
        })

    if ( db !== null) {
   // console.log('数据已存在\n')
    continue;
} 

     //  console.log( "在getHotWord.js第57行\n"+JSON.stringify(res));

       const item =  await hotstem.create({
           article: article,
           name: name,
           type:""
          })

       if (img) {
           let id = item.dataValues.id; 
           const data =  await stemimg.create({
               link: img,
               hotStem_id:id
           })
       }

        
    } 

    }
}


module.exports = getHotStem;