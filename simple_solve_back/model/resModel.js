class BaseModel{
    //data 是字符串,说明是特殊处理的,直接返回data这个字符串就可以了
    constructor(data,message){
        if(typeof data === "string"){
    
            this.message = data
            data = null
            message = null
        }
    
        
     if(data){
         this.data = data
     }
     if(message){
         this.message = message
     }
    
    }
     
    }
    
    //正常返回
    class SuccessModel extends BaseModel{
    
        constructor(data,message){
            console.log(data)
            super(data,message)
            this.errno = 0
        }
    }
    
    // 出错返回
    class ErrorModel extends BaseModel{
    
        constructor(data,message){ 
            super(data,message)
                this.errno = -1
            
        }
    }
    
    module.exports = {
        SuccessModel,
        ErrorModel
    }