<template>
  <div class="punchline_body">
        <el-menu
          :default-active="p_activeIndex"
          class="el-menu-demo middle_menu puchline_menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1" style="">热门词条</el-menu-item>
          <el-menu-item index="2">趣味梗</el-menu-item>
          <el-menu-item index="3">流行词汇</el-menu-item>
          <el-menu-item index="4">科技热词</el-menu-item>
          <el-menu-item index="5">排行榜</el-menu-item>
        </el-menu>
      <div class="middle3_body bodyStyle3">
        <el-container>
          <el-main class="main_div">
            <div class="middle3_box" v-for="item in p_FeaturedList2" :key="item.id">
              <div class="middle3_boxImg">
                <el-image :key="item.link" :src="item.link" class="middle3_Img" fit="fit" lazy></el-image>
              </div>
              <div class="fontBox3" > 
                <div class="font_title3" @click="goDetailed(item.id)"><a href="javasrcpt:void(0)">{{item.name}}</a></div>
                <div class="font_body3">{{item.article}}</div>
                <!--    <div class="font_data">高飞 2020-2-18</div> -->
              </div>
              
            </div>

            <div class="page_main">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="page_all"
                  class="page_main_div"
                  @current-change = "p_page"
                  >
                </el-pagination>
            </div>
          </el-main>
          <el-aside width="235px" class="aside_margin">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="aside_title">最 近 更 新</span>
              </div>
              <div v-for="(item,index) in HotUperList" :key="index" class="punchline_UperList">
                <div class="list_title">{{item.title}}</div>
                <div class="list_time">{{item.time}}</div>
              </div>
            </el-card>
          </el-aside>
        </el-container>
      </div>
  </div>
</template>

<script>
import Bus from '../../../build/bus.js'
export default {
    name:'punchline',
    data(){
        return{
            p_activeIndex:"1",
            p_FeaturedList2 :[],
            page_all : 1000,
            p_limit:5,
            p_offset:1,
            key:1,
            nowData:'热门词条',
            pathname:'punchline',
            HotUperList:[
              {
                title:"随薪锁欲",
                time :"2020-3-12"
              },
              {
                title:"在你头上暴扣",
                time :"2020-3-12"
              },
              {
                title:"李现12厘米",
                time :"2020-3-12"
              }
            ],

        }
    },
    created(){
      Bus.$emit("headerChange", this.pathname);
      this.$axios
      .get(`/index/getHotWordAll?limit=  ${this.p_limit}&offset=1`)
      .then(res => {
        console.log(res.data);
        if (res.data.errno == 0) {
          this.p_FeaturedList2 = res.data.data.list;
          this.page_all =   res.data.data.total*10/this.p_limit;
        }
      })
      .catch(err => {
        console.log("错误");
      });
    },
    methods:{
      handleSelect(key, keyPath){
        let p_src;
        if(key=='1'){
            this.nowData = '热门词条';
            this.key=1;
            p_src = 'getHotWordAll';
        }
        if(key=='2'){
            this.nowData = '趣味梗';
            this.key=2;
            p_src = 'getHotStemAll';
        }
        if(key=='3'){
            this.nowData = '流行词汇';
            this.$message({
            message: '亲，流行词汇、科技热词、派行榜分区暂未开放，尽情期待哟！',
              type: 'warning'
            });
        }
        if(key=='4'){
            this.nowData = '科技热词';
            this.$message({
            message: '亲，流行词汇、科技热词、派行榜分区暂未开放，尽情期待哟！',
              type: 'warning'
            });
        } 
        if(key=='5'){
            this.nowData = '排行榜';
            this.$message({
            message: '亲，流行词汇、科技热词、派行榜分区暂未开放，尽情期待哟！',
              type: 'warning'
            });
        } 

        this.$axios
      .get(`/index/${p_src}?limit=  ${this.p_limit}&offset=1`)
      .then(res => {
        console.log(res.data);
        if (res.data.errno == 0) {
          this.p_FeaturedList2 = res.data.data.list;
          this.page_all =   res.data.data.total*10/this.p_limit;
        }
      })
      .catch(err => {
        console.log("错误");
      });
      },
      goDetailed(id){
            this.$router.push({
              name:'detailed',        
              query: {
                 Nowtitle: this.nowData, id: id, pathname: this.pathname
              }
            });
      },
      p_page(newPage){
        console.log(newPage);
        let p_src = '';
        if(this.key=='1'){
            p_src = 'getHotWordAll';
        }
        if(this.key=='2'){
            p_src = 'getHotStemAll';
        }
        if(p_src!=''){
                  this.$axios
                  .get(`/index/${p_src}?limit=  ${this.p_limit}&offset=${newPage}`)
                  .then(res => {
                    console.log(res.data);
                    if (res.data.errno == 0) {
                      this.p_FeaturedList2 = res.data.data.list;
                      this.page_all =   res.data.data.total*10/this.p_limit;
                    }
                  })
                  .catch(err => {
                    console.log("错误");
      });
        }
      }
    }
    
}
</script>

<style>
.punchline_body{
  min-width: 1000px;
}
.puchline_menu{
  margin-top: 20px;
  padding-left: 30px;
} 
.puchline_menu >.el-menu-item{
  height: 42px;
  line-height: 42px;
}
.middle3_boxImg {
  height: 150px;
  width: 200px;
}
.middle3_box {
  display: flex;
  padding: 20px 0;
}
.middle3_Img {
  height: 100%;
  width: 100%;
}
.middle3_body {
  width: 100%;
}
.fontBox3 {
  width: 700px;
  height: 150px;
  line-height: 20px;
  padding-left: 20px;
  position: relative;
}
.fontBox3 div {
  padding-top: 10px;
}
.font_title3 {
  white-space: nowrap;
  font-size:18px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}
.font_body3 {
  overflow: hidden;
  font-size: 14px;
  color: #666666;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.font_data3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  right: 0;
  bottom: 0px;
}
.bodyStyle3 {
  width: 100%;
  min-width: 900px;
  margin-right: 2 0px;
}
.page_main{
  width: 100%;
  padding-top: 30px;
  position: relative;
}
.page_main_div{
  margin: 0 auto;
  width:600px;
}
.main_div{
  padding-left: 30px;
  padding-right: 30px;
}
.box-card{
  margin-top: 30px;
  border-top:red solid 4px;
}
.el-card__body{
  padding: 10px 20px;
}
.aside_title{
  font-size: 13px;
}
.punchline_UperList{
  display: flex;
  padding-top: 7px;
  font-size: 12px;
  color: #C0C4CC;
}
.list_title{
    width: 70%;
}
.list_time{
  width: 30%;
}
a:link{
  color: #303133;
  text-decoration:none;
}
a:hover{
  color:#409EFF;
} 
</style>