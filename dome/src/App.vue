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
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b" >
          <a index="2"></a>
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="technology" >科技易解</el-menu-item>
          <el-menu-item index="punchline" >梗易解</el-menu-item>
          <el-menu-item index="community">易解社区</el-menu-item>
          <el-menu-item index="about">关于我们</el-menu-item>
        </el-menu>
        <div class="float_header">
          <div class="header_input">
            <input type="text" placeholder="搜索一下"/>
          </div>
          <div class="head_img">
            <div class="img_box">
              <img src="./assets/logo.png" alt="" style="width:100%;height:100%">
            </div>
            <span>劲哥哥</span>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      activeIndex1: 'index'
    }
  },
  methods:{
          handleSelect(key, keyPath) {
             console.log(key, keyPath);
             this.$router.push({name:key});
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
  background: #545c64;
  
}
.header{
  position: relative;
  display: flex;
  background: #545c64;
  height: 60px;
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
}
.logo{
  background: #545c64;
  float: left; 
  width: 70px;
  font-size: 22px;
  color: white;
  line-height: 60px;
}
.menu{
 height: 50px;
}
.menu ul {
  display: flex;
}
.header_input{
  width: 250px;
  line-height: 60px;
}
.header_input input{
  height: 30px;
  border: #545c64 solid 1px;
  border-radius: 5px; 
  width: 200px;
}
.head_img{
  display: flex;  
  line-height: 60px;
}
.float_header{
  position:absolute;
  right: 0;
  display: flex;  
}
.img_box{
  width: 30px;
  height: 30px;
  margin-top:10px; 
}
</style>
