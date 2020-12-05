<template>
  <div id="app">
    <div class="headers">
      <div class="header">
        <div class="logo">
          易解
        </div>
        <el-menu
          :default-active="activeIndex1"
          class="el-menu-demo menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#333333"
          text-color="#fff"
          active-text-color="#ffd04b" 
          >
          <a index="2"></a>
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="technology" >科技易解</el-menu-item>
          <el-menu-item index="punchline" >易解热词</el-menu-item>
          <el-menu-item index="community">易解社区</el-menu-item>
          <el-menu-item index="about">关于我们</el-menu-item>
        </el-menu>
        <div class="float_header">
          <div class="header_input">
              <el-select
              v-model="value"
              filterable
              remote
              reserve-keyword
              placeholder="搜索一下"
              :remote-method="seletMethod"
              :loading="loading"
              @change="clickMethod(value)">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name"
                >
              </el-option>
              </el-select>
          </div>
          <div class="head_img">
              <div v-if="!isLogin" class="login" @click="close_popup " >
                登陆 | 注册
              </div>
              
                <el-dropdown v-else>
                  <div class="float_header_mig">
                    <div class="img_box">
                      <img :src="user.avator" alt="" style="width:100%;height:100%;border: 2px solid  #333333;border-radius: 20px;">
                    </div>
                    <span style="color: rgb(255, 208, 75);padding-left:12px;cursor: pointer;">{{user.nickName}}</span>
                    <el-dropdown-menu slot="dropdown" class="drop_menu">
                      <el-dropdown-item @click.native="person_user">个人资料</el-dropdown-item>
                      <el-dropdown-item @click.native="login_out">退出登陆</el-dropdown-item>
                      <el-dropdown-item style="color: rgb(255, 208, 75);">该功能·</el-dropdown-item>
                      <el-dropdown-item style="color: rgb(255, 208, 75);">未完善·</el-dropdown-item>
                      <el-dropdown-item style="color: rgb(255, 208, 75);">敬请期待~</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
                
            </div>
          

        </div>
      </div>
    </div>
    <router-view/>
    <div id="popWindow" class="popWindow" v-if="popup">
      <form class="popup">
        <div >
          <img class="popupImg" src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" alt="">
        </div>
        <i class="el-icon-close" @click="close_popup"></i>
        <div class="popupDiv">
          <h3 class="title">{{popup_title}}</h3>
          <div class="popup_login">
            <div class="input-box" v-for="(item,index) in popupList" :key="index">
              <input :type="item.type" :maxlength="item.maxlen" :placeholder="item.key" class="popup_input" v-model="item.value">
              <input type="button" class="send-vcode-btn" v-if="item.btn" @click="send" :disabled="isSend" :class="{'vcode-btn':isSend}" :value="checkCode" />
            </div>
          </div>
          <el-button type="primary" class="btn" @click="click_btn" :disabled="isbtn">{{btn}}</el-button>
          <div class="prompt-box" :class="{'center':centerOK}">
            {{popup_span}}
            <span class="clickable" @click="go_Login">{{register}}</span>
            <a href="javasrcpt:void(0)" class="forgetPasswork" @click="fotget"  v-if="!centerOK" >忘记密码</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Bus from '../build/bus.js'
export default {
  name: 'App',
  data(){
    return{
      value:'',
      activeIndex1: 'index',
      input:"",
      user:[],
      checkCode:"发送验证码",
      isSend:false,
      loading: false,
      pathname:'index',
      id:'',
      nowData:'搜索',
      hasMask:false,
      options:[],
      popup:false,
      isLogin:false,
      popup_span:"没有账号？",
      btn:"登陆",
      popup_title:"登陆",
      register:"注册",
      centerOK:false,
      isbtn:false,
      popupList:[
        { 
            maxlen:64,
            key:"请输入邮箱",
            btn:false,
            value:"",
            type:"email"
        },
        { 
            maxlen:64,
            key:"请输入密码",
            btn:false,
            value:"",
            type:"password"
        }
        ],
      popupList1:[
        { 
            maxlen:64,
            key:"请输入邮箱",
            btn:false,
            value:"",
            type:"email"
        },
        { 
            maxlen:64,
            key:"请输入密码",
            btn:false,
            value:"",
            type:"password"
        }
        ],
      popupList2:[
        { 
            maxlen:64,
            key:"请输入用户名",
            btn:false,
            value:"",
            type:"text"
        },
        { 
            maxlen:64,
            key:"请输入邮箱",
            btn:false,
            value:"",
            type:"email"
        },
        { 
            maxlen:5,
            key:"请输入验证码",
            btn:true,
            value:"",
            type:"text"
        },
        { 
            maxlen:64,
            key:"请输入密码(大于八位)",
            btn:false,
            value:"",
            type:"password"
        }
      ]
    }
  },
  created(){
      this.User();

      Bus.$on('headerChange', (data) => {
        if(this.activeIndex1==data){
              return false;
            }else{
                this.activeIndex1 = data;
            }
        })

  },
  methods:{
          handleSelect(key, keyPath) {
            if(this.activeIndex1==key){
              return false;
            }else{
                console.log(key, keyPath);
                this.$router.push({name:key});
            }
             
          },
      seletMethod(query) {
        if (query !== ''&&query !== undefined &&query !== null) {
          this.loading = true;
          this.$axios.get(`/index/search?name=${query}&offset=1&limit=10`)
          .then(res=>{
            console.log(res.data);
            if(res.data.errno==0){
              this.loading = false;
              this.options = res.data.data;
            }else{
              this.loading = false;
              this.options = [];
            }
          })
          } else {
            this.options = [];
          }
        },
        clickMethod(value){
            let item;
            this.options.forEach(element => {
              if(element.name==value){
                item = element;
              }
            });
            if(this.$route.path=='/detailed'){
                    Bus.$emit('SerchOK', item);
            }else{
                    this.activeIndex1 = "搜索";
                    this.$router.push({
                      name:'detailed',        
                      query: {
                        Nowtitle: this.nowData, id: item.id, pathname: this.pathname,type:item.type
                      }
                    });
            }
        },
        go_Login(){
          if(this.popup_title=="登陆"){
            this.popup_title="注册";
            this.btn = "注册";
            this.popupList = this.popupList2;
            this.popup_span = "";
            this.centerOK = true;
            this.register = "已有账号登陆";
          }else{
            this.popup_title="登陆";
            this.popupList = this.popupList1;
            this.popup_span = "没有账号？";
            this.centerOK = false;
            this.register = "注册";
            this.btn = "登陆";
          }
        },
        click_btn(){
          
          var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(this.popup_title=="登陆"){
            if(this.isNull(this.popupList[0].value)||this.isNull(this.popupList[1].value) ){
              console.log("aaa");
              this.$message.error('账号或密码不能为空');
            }else if(!myreg.test(this.popupList[0].value)){
              this.$message.error('邮箱不合法');
            }else{
              this.isbtn = true;
              let data = {"userName":this.popupList[0].value,"password":this.popupList[1].value};
              this.$axios
              .post(`/user/login`,data)
              .then(res=>{

                if(res.data.errno==-1){
                  this.$message.error("邮箱或者密码错误");
                  this.isbtn = false;
                }else{
                  this.$message({
                    message: '登陆成功',
                    type: 'success'
                  });
                    this.$message({
                    message: '注册成功,但由于网站为完善用户中心暂为开放使用',
                    type: 'success'
                  });
                  localStorage.setItem("userToken",res.data.data.token);
                  console.log("login token",res.data.data.token);
                  this.isLogin = true;
                  this.close_popup();
                  this.User();
                }
              })
            }
          }else{
            if(this.isNull(this.popupList[0].value)){
              this.$message.error('用户名不能为空');
            }else if(this.isNull(this.popupList[1].value)){
              this.$message.error('邮箱不能为空');
            }else if(this.isNull(this.popupList[2].value)){
              this.$message.error('请输入验证码');
            }else if(this.isNull(this.popupList[3].value)){
              this.$message.error('请输入密码');
            }else if(this.popupList[2].value.length!=5){
              this.$message.error('验证码不正确');
            }else if(this.popupList[3].value.length<8){
              this.$message.error('密码的长度必须大于8位');
            }else{
              this.isbtn = true;
              let data = {
                type:1,
                nickName:this.popupList[0].value,
                mail:this.popupList[1].value,
                verify:this.popupList[2].value,
                password:this.popupList[3].value
              };
              this.$axios
              .post(`/user/checkCode`,data)
              .then(res=>{
                if(res.data.errno){
                  this.$message.error(res.data.message);
                  this.isbtn = false;
                }else{
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  });
                  this.$message({
                    message: '注册成功,但由于网站为完善用户中心暂为开放使用',
                    type: 'success'
                  });
                  localStorage.setItem("userToken",res.data.data.token);
                  this.isLogin = true;
                  this.close_popup();
                  this.User();  
                }
              })
            }
          }
        },
        isNull(a){
          if(a==undefined||a==null||a=="")
               return true;
          else return false;
        },
        send(){
          var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(!myreg.test(this.popupList[1].value)){
              this.$message.error('邮箱不合法，请重新填写');
              return false;
          }
          let data = {
            "type":1,
            "mail":this.popupList[1].value
          }
              this.$axios
              .post(`/user/getmailbox`,data)
              .then(res=>{
                if(res.data.errno){
                  this.$message.error(res.data.message);
                  console.log(res.data);
                  console.log(data);
                  
                }else{
                  this.$message({
                    message: '发送成功',
                    type: 'success'
                  });
                  let _this = this
                  _this.isSend = true;
                  let t = 0;
                  let time = setInterval(function(){  //注意，此处的this作用域发生改变
                    t++;
                    _this.checkCode =  60-t+"秒后重新发送";
                    if(t>59){
                      clearInterval(time);
                      _this.isSend=false;
                      _this.checkCode = "发送验证码";
                    }
                  },1000)
                }
              })
              return false;
        },
        close_popup(){
          this.popup = !this.popup;
          this.isbtn = false;
        },
        User(){
          let token = localStorage.getItem("userToken");
          console.log("token",token);
          if(!this.isNull(token))
          {

            // 设置请求拦截器
            this.$axios.interceptors.request.use(config => {
              
              if (token) {
                // 将获取到的token设置给header中的Authorization
                config.headers.Authorization = token
              }
              return config
            })

            this.$axios.get('/user/getUser')
            .then(res=>{
              console.log(res.data);
              if(res.data.errno==0){
                this.user = res.data.data;
                this.isLogin = true;
                console.log("user",res.data);
              }else{
                this.$message({
                  message: '亲，用户登陆已过期，请重新登陆',
                  type: 'warning'
                });
              }
            })
            .catch(err=>{
              console.log("user错误");
            })
          }
        },
        person_user(){
            this.$message({
            message: '亲，该功能还未实现，程序猿们已在快马加鞭的制作中，敬请期待哟~~~~',
              type: 'warning'
            });
        },
        login_out(){
            localStorage.setItem("userToken",'');
            this.isLogin = false;
            this.$message({
            message: '退出登陆成功~~~',
              type: 'success'
            });
        },
        fotget(){
                  this.$message({
                  message: '亲，该功能还不能用',
                  type: 'warning'
                });
        }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  padding: 0;
  margin: 0;
}
.headers{
  background: #333333;
  height: 60px;
}
.header{
  min-width: 1000px;
  position: relative;
  display: flex;
  background: #333333;
  height: 60px;
  margin: 0 auto;
}

.logo{
  background: #333333;
  float: left; 
  width: 80px;
  text-align: center;
  font-size: 22px;
  color: white;
  line-height: 60px;
}
.el-menu--horizontal>.el-menu-item{
 height: 60px;
 line-height: 60px;
}

.menu ul {
  display: flex;
}
.header_input{
  width: 250px;
  line-height: 60px;
}

.head_img{
  height: 56px;
  display: flex;
  align-items :center;
  margin-right: 30px;
  border-bottom:2px solid rgb(255, 208, 75) 
}
.float_header{
  position:absolute;
  right: 30px;
  display: flex;  
}
.float_header_mig{
  display: flex; 
  align-items :center;
}
.img_box{
  width: 40px;
  height: 40px;
}
.head_img span {
  line-height: 60px;
}
.popWindow {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,.3);
      z-index: 500;
}
.popup {
      position: relative;
      top: -65px;
      padding: 2rem;
      width: 26.5rem;
      max-width: 100%;
      font-size: 1.167rem;
      background-color: #fff;
      border-radius: 2px;
      box-sizing: border-box;
}
.popupImg{
    position: absolute;
    top: 0;
    left: 50%;
    width: 10rem;
    transform: translate(-50%,-83%);
    z-index: 1;
}
.popupDiv{
  width: 100%;  
}
.el-icon-close{
  line-height: normal;
  word-break: break-word;
  float: right;
  cursor: pointer;
  font-size: 18px;
}
.title{
  margin: 0 0 2rem;
}
.input-box{
  position: relative;
  margin-bottom:0.8rem ;
}
.popup_input{
  padding: 13px;
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
}
.btn{
    width: 100%;
    height: 3.334rem;
    outline: none;
    box-sizing: border-box;
    cursor: pointer;
}
.popup_login{
  margin-bottom: 1rem;
}
.prompt-box{
  margin: 1rem 0 0;
  color: #767676;
}
.clickable{
  color: #007fff;
  cursor: pointer;
}
.forgetPasswork{
  background-color: transparent;
  margin: initial;
  text-decoration: none;
  float: right;
  color: #007fff;
  cursor: pointer;
}
.center{
  text-align: center;
}
.input-box input:focus{
  border-color:rgb(0, 127, 255);
}
.send-vcode-btn{
  word-break: break-word;
  font: inherit;
  overflow: visible;
  text-transform: none;
  margin: initial;
  -webkit-appearance: none;
  border-radius: 2px;
  border: none;
  padding: .5rem 1.3rem;
  outline: none;
  transition: background-color .3s,color .3s;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  color: #007fff;
  line-height: 1;
  background-color: transparent;
}
.vcode-btn{
      color:  rgb(170, 170, 170)
}
.login{
  font-size: 1.33rem;
  cursor: pointer;
  color:#e9e9e9;

}
.login:hover{
  color: #409EFF;
}
.drop_menu{
  width: 120px;
}
</style>
