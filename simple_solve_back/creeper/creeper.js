const cheerio = require("cheerio");

const superagent = require("superagent");

const fs = require("fs");

class Creeper{

    constructor(obj) {
        this.obj = {

        };


        // 方法的处理
        this.obj.method = obj.method || undefined;

        
        if (this.obj.method == undefined) {
            throw new Error("请传入方法名")
        }
         //url 的处理,并提取出baseUrl
        let url = obj.url || undefined;
        
        if (url == undefined || url == "") {
            throw new Error("请传入正确的url路径")
        }

        let index_split;

        if (url.indexOf("http") != -1) {
            let index = 0;
           
            for (let i in url) {
                if (url[i] == '/') {
                    index++;
                }
                if (index == 3) {
                //   console.log(typeof (i)) ;
                    index_split = i;
                    break;
                }
            }
        } 
        
        if (index_split == undefined) {

            this.obj.baseUrl = url;
            this.obj.url = url;
        } else {
            // 这里 index_split 是字符串类型的
            let num = index_split - 0;

            this.obj.baseUrl = url.slice(0, num);

            this.obj.routerUrl = url.substring(num);
            this.obj.url = url;
        }

        // data的处理
        this.obj.data = obj.data || {};


        // header头部信息的处理
        this.obj.headers = {};
            
        this.obj.headers.cookie = obj.cookie || '';

        if (this.obj.method === "POST") {
            this.obj.headers['Content-Type'] = obj.headers['Content-Type'] || 'application/json';
        } 
        
        this.obj.headers['user-agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
       
        // 定时请求数据

      //  setInterval(() => {
             
      //  }, 86400000);
      //  this.sendData();

        return this;
    }

     async sendData() {
        let obj = this.obj
        // 分为发送get请求和发送post请求
        // 设置超时,超时的话,会在err对象中获取到错误的信息
        let promise = new Promise((resolve,reject) => {
            
            if(obj.method == "GET")
            superagent.get(obj.url)
                .set(obj.headers)
                .query(obj.data)
                .timeout({
                    response: 5000,
                    deadline:60000
                })
                .on('error', (err) => {
                    throw new Error(err);
                })
               
                .then((res) => {
                   let data = this.handleData(res);
                    resolve(data);
                })
        
        else
            superagent.post(obj.url)
                .set(obj.headers)
                .send(obj.data)
                 .timeout({
                    response: 5000,
                    deadline:60000
                }) 

                .on('error', (err) => {
                    throw new Error(err);
                })
               
                .then((res) => {
                let data = this.handleData(res)
                    resolve(data);
                })

        })

        return promise;
       
    }

    handleData = (res) => {

        if (res.ok) {

          //  console.log(res.text);
         
       let cookie =  res.header['set-cookie'];
            this.obj.headers.cookie = cookie;
            
            if (res.type.indexOf('html') !== -1) {
                return  this.saveDataHtml(res.text);
            }
            if (res.type.indexOf('json') !== -1) {

                console.log(res.body)
              return  this.saveDataJson(res.body);
            }

        } else {
           // throw new Error();
          return res.err;
        }
    }

    setBaseUrl(url) {
        this.obj.baseUrl = url; 
        this.obj.url = url + routerUrl;
    }

    setRouterUrl(url) {
        this.obj.routerUrl = url; 
        this.obj.url = this.obj.baseUrl + url;

        console.log(this.obj.url);
    }

    getUrl() {
        return this.obj.url;
    }

    // 传递映射关系
    setSaveFormat(map) {
        this.map = map;
    }

    saveDataJson(data) {
       // console.log(data);
        //debugger;
        // 要求传进来的map.data必须是个数组,要把所有数据都挂载到这个data数组下面,data[0]就是模板
        let map = this.map.data.shift();


        let dataArr = [];


        // 进行遍历,模板有哪些选项
        for (let i in map) {
            
            let arr = map[i].split('.');

            
            dataArr.push(data);
            
            let index = 1;

            //当结果的下一个索引是undefined的时候,如果当前值是不是undefined,如果不是,就退出循环了,
             //找到结果了
            // 出错的坑,没有想到弹出了,所以不能用x索引,得用0才行
            // 使用广度优先搜索,进行遍历
            // 对属性进行迭代处理
            for (let i of arr) {

                let length = index;
             // 说明该属性是个数组
                index = 0;


                for (let x = 0; x < length; x++){

                    debugger;
                 //   console.log("next")

                    
                    if (dataArr[0][i] === undefined || dataArr[0] === undefined) {
                        if (dataArr[0] !== undefined) {
                            break;
                        } else {
                            dataArr.shift();
                            continue;
                        }
                    }
                    
                    if( dataArr[0][i] instanceof Array)
                    {
                        // result[i] 是个数组,进行遍历
                        for (let j of dataArr[0][i]) {
                            
                            dataArr.push(j);
                            index++;
                        }
    
                        dataArr.shift();
    
                    } else {
    
                        dataArr.push(dataArr[0][i]);
                        index++;
                        dataArr.shift();
                    }

                }       
    
            }
            
            let sign = 0;

            for (let data of dataArr) {

                if (this.map.data[sign] == undefined) {
                    this.map.data[sign] = {};
                }

                this.map.data[sign][i] = data;
                sign++;
            }
        } 
       

        this.map.data = this.map.data.filter((item) => {
            
            for (let j in map) {
                if (item[j] == undefined) {
                    return false;
                }
            }  
            return true;
        });
        
       return this.map;

    }

    saveDataHtml(text) {

      //  console.log(text);

        let map = this.map.data.shift();

        let $ = cheerio.load(text);

        let arr = [];

        for (let i in map) {

            console.log(map[i]);

                
                $(map[i]).each((index, item) => {


                    if (!arr[index]) {
                        arr[index] = {}
                    }


                    if (i == "content") {
                         arr[index][i] = $(item).text();
                    }   
                    
                    if (i == "src") {

                    if ($(item).attr('href'))
                        arr[index][i] = $(item).attr('href');
                    else
                    arr[index][i] = $(item).attr('src');
                    }
      
                    if (i == "header") {
                        arr[index][i] = $(item).text();
                   }   
                })
                
                
            } 

        this.map.data = arr;
            return this.map;

    }

}

module.exports = Creeper;