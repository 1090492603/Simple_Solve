<template>
  <div class="community">
    <div class="community_menu_box">
            <el-menu
          :default-active="C_activeIndex"
          class="el-menu-demo middle_menu community_menu"
          mode="horizontal"
          background-color="#F2F6FC"
          @select="CommunitySelect"
        >
          <el-menu-item index="limit" style="">今日推荐</el-menu-item>
          <el-menu-item index="offset">精选话题</el-menu-item>
        </el-menu>
    </div>
    <el-container class="community_contain">
      <el-main class="community_main">
        <div class="community_main_div" v-for="item in communityList" :key="item.id">
          <div class="c_contain_title">
           <a href="javasrcpt:void(0)" @click="goDetailed(item.id)"> {{item.question  }}  </a>
          </div>
          <div class="c_contain_body">
            <div class="c_contain_p"  v-html="item.answer">

            </div>
          </div>
        </div>
        <div class="page_main">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="c_page_all"
              class="page_main_div"
              @current-change = "c_page"
              >
            </el-pagination>
        </div>
      </el-main>
      <el-aside width="200px" class="community_aside">
        <div class="c_aside_title">
          搜集各大平台热门话题
        </div>
        <div class="c_imgbox"><img class="c_img" src="../../assets/community.png" alt=""></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Bus from '../../../build/bus.js'
export default {
    name:'community',
    data(){
        return{
            C_activeIndex : "limit",
            limit:6,
            d_key : "limit",
            offset:1,
            c_page_all : 1000,
            communityList :[],
            nowData:'今日推荐',
            c_Nowpage:1,
            pathname:"community"
        }
    },
    created(){
            Bus.$emit("headerChange", this.pathname);
            this.$axios
            .get(`/index/getQAAll?limit=  ${this.limit}&offset=1`)
            .then(res => {
              console.log(res.data);
              if (res.data.errno == 0) {
                this.c_page_all =   res.data.data.total*10/this.limit;
                this.communityList = res.data.data.list;
                this.communityList.forEach(element => {
                  element.answer = element.answers[0].like;
                });
              }
            })
            .catch(err => {
              console.log("错误");
            });
    },
    methods:{
      CommunitySelect(key,keypath){
          if(key=='limit'){
            this.d_key = "limit";
            this.$axios
            .get(`/index/getQAAll?limit=  ${this.limit}&offset=1`)
            .then(res => {
              console.log(res.data);
              if (res.data.errno == 0) {
                this.c_page_all =   res.data.data.total*10/this.limit;
                this.communityList = res.data.data.list;
                this.communityList.forEach(element => {
                  element.answer = element.answers[0].like;
                });
                this.nowData = "今日推荐";
              }
            })
            .catch(err => {
              console.log("错误");
            });
          }else if(key=='offset'){
            this.d_key = "offset";
            this.$axios
            .get(`/index/getFeaturedAnswerAll?limit=${this.limit}&offset=1`)
            .then(res => {
              console.log(res.data);
              if (res.data.errno == 0) {
                this.c_page_all =   res.data.data.total*10/this.limit;
                console.log(this.c_page_all);
                console.log(res.data.data.total);
                this.communityList = res.data.data.list;
                this.communityList.forEach(item=>{
                  item.id = item.question_id;
                })
                this.nowData = "精选话题";
              }
            })
            .catch(err => {
              console.log("错误");
            });
          }
      },
      goDetailed(id){
        console.log(id);
            this.$router.push({
              name:'detailed',        
              query: {
                 Nowtitle: this.nowData, id: id, pathname: this.pathname
              }
            });
      },
     c_page(newPage){
        console.log(newPage);
        
        let p_src = '';
        if(this.d_key=='limit'){
            this.d_key = "limit";
            this.$axios
            .get(`/index/getQAAll?limit=  ${this.limit}&offset=${newPage}`)
            .then(res => {
              console.log(res.data);
              if (res.data.errno == 0) {
                this.c_page_all =   res.data.data.total*10/this.limit;
                this.communityList = res.data.data.list;
                this.communityList.forEach(element => {
                  element.answer = element.answers[0].like;
                });
                this.nowData = "今日推荐";
              }
            })
            .catch(err => {
              console.log("错误");
            });
          }
          if(this.d_key=='offset'){
            this.d_key = "offset";
            this.$axios
            .get(`/index/getFeaturedAnswerAll?limit=${this.limit}&offset=${newPage}`)
            .then(res => {
              console.log(res.data);
              if (res.data.errno == 0) {
                this.c_page_all =   res.data.data.total*10/this.limit;
                this.communityList = res.data.data.list;
                this.communityList.forEach(item=>{
                  item.id = item.question_id;
                })
                this.nowData = "精选话题";
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
.community{
  position: relative;
  background: #F2F6FC;
  min-width: 1000px;
}
.community_menu_box{
  padding: 30px 30px 0 50px;
}
.community_menu>.el-menu-item{
  height:  40px;
  line-height: 40px;
}

.community_main_div{
  background: #ffffff;
  width: 70%;
  min-width: 650px;
  margin: 30px 0;
  padding:0 10px ;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

}
.community_main_div  div{
  width: 100%;
}
.c_contain_title{
  padding-top: 10px;
  	overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #303133;
    font-weight: 600;
}
.c_contain_p{
    padding-top: 20px;
    padding-bottom: 20px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;  /*限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #909399;
    font-size: 14px;
}
.community_main{
  margin-left: 50px;

}

.community_aside{
  margin-right: 40px;
}
.c_aside_title{
  background: #ffffff;
  border: #C0C4CC 1px solid;
}

.el-menu.el-menu--horizontal{
  border-bottom: 0px;
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
a:link{
  color: #303133;
  text-decoration:none;
}
a:hover{
  color:#409EFF;
} 
.imgbox{
  width: 99%;
}
.c_img{
  width: 100%;
}
</style>