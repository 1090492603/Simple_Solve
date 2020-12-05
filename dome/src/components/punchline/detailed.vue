<template>
  <div class="punchline_body">
        
        <div class="punchlin_header">
            <div class="punchlin_heade_title1">{{Nowtitle}}></div>
            <div class="punchlin_heade_title2">{{DetailedList.name}}</div>
        </div>
      <div class="middle4_body bodyStyle4">
        <el-container>
          <el-main class="d_main_div">
            <div class="detailed_main">
                <div class="dedetailed_main_ptailed_main_title">{{DetailedList.name}}</div>
                <el-divider></el-divider>
                <div class="detailed_main_div1">
                    <div class="detailed_main_title1">来源和意思：</div>
                    <div class="detailed_main_p" v-html="DetailedList.article"></div>
                </div>
                <el-divider></el-divider>
                <div class="detailed_main_div2">
                    <div class="detailed_main_title2">相关:</div>
                    <div class="detailed_main_imgBox">
                      <img :src="DetailedList.link?DetailedList.link:' '" alt="" class="detailed_main_img">
                    </div>
                </div>
                <div class="d_page_foot">页面到尽头了</div>
            </div>
            
          </el-main>
          <el-aside width="235px" class="d_aside_margin">
            <el-card class="box-card">
              <div slot="header" class="d_clearfix">
                <span class="aside_title">目录</span>
              </div>
              <div class="punchline_UperList">
                <div class="list_title">来源和意思</div>
                <div class="list_time">相关</div>
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
    name:'detailed',
    data(){
        return{
            activeIndex:"1",
            page_all : 1000,
            DetailedList:{},
            Nowtitle:'',
            id:'',
            type:0,
            pathname:''
        }
    },
    created(){

      
      Bus.$on('SerchOK', (data) => {
         console.log("SerchOK");
          this.id = data.id;
          this.type = data.type;  
          this.ajaxSerch();
      })

      this.getRouterData();
      let patnSrc = '';
      if(this.pathname=='punchline' || this.pathname=='index'){
        if(this.Nowtitle=='热门词条'){
            patnSrc = 'getWordDetail';
        }else if(this.Nowtitle=='趣味梗'){
            patnSrc = 'getStemDetail';
        }else if(this.Nowtitle=='搜索'&&this.type!=0){
            this.ajaxSerch();
            return false;
        }else{
            patnSrc = 'getStemDetail';
        }
        
      }
      if(this.pathname=='community'){
        patnSrc = 'getQADetail'
      }
      this.$axios
      .get(`/index/${patnSrc}?id=${this.id}`)
      .then(res => {
        if (res.data.errno == 0) {
          if(this.pathname=='punchline'){
            this.DetailedList = res.data.data;
            console.log(res.data.data);
          }else{
            console.log(res.data.data);
            this.DetailedList ={};
            this.DetailedList.name = res.data.data.question;
            this.DetailedList.article = res.data.data.answer;
            this.DetailedList.link = res.data.data.link;
          }
        }
      })
      .catch(err => {
        console.log("错误");
      });

    },
    methods:{
      getRouterData() {
            this.pathname = this.$route.query.pathname;
            this.Nowtitle = this.$route.query.Nowtitle;
            this.id = this.$route.query.id;
            console.log('Nowtitle', this.Nowtitle)
            console.log('id', this.id)
            console.log('pathname', this.pathname)
            
            if(this.$route.query.type){
              this.type = this.$route.query.type;
            }
            console.log('type',this.type)
      },
      ajaxSerch(){
          this.$axios
          .get(`/index/getSearchDetail?id=${this.id}&type=${this.type}`)
          .then(res => {
            if (res.data.errno == 0) {
              if(this.type==1||this.type==2){
                this.DetailedList = res.data.data;
                console.log(res.data.data);
              }else{
                console.log(res.data.data);
                this.DetailedList ={};
                this.DetailedList.name = res.data.data.question;
                this.DetailedList.article = res.data.data.answer;
                this.DetailedList.link = res.data.data.link;
              }
            }
          })
      }
    }
}
</script>

<style>
.punchline_body{
  min-width: 1000px;
  padding: 15px 40px 20px 40px;
  background: #F2F6FC;

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
.middle4_body {
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
.bodyStyle4 {
  width: 100%;
  min-width: 900px;
  margin-right: 20px;
  position: relative;
}
.page_main_div{
  margin: 0 auto;
}
.d_main_div{
  padding: 10px 20px 20px 20px;
  margin-top: 20px;
  max-width: 60%;
  min-width: 600px;
  height: 600px;
  background: #ffffff;
  
  border: #E4E7ED solid 1px;
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
  padding-top: 7px;
  font-size: 12px;
}
.punchline_UperList div{
  padding: 5px 0;
}
.list_title{
    width: 70%;
}
.list_time{
  width: 30%;
}

.d_aside_margin{
  position:absolute;
  right: 0;
}
.punchlin_header{
  display: flex;
  font-size: 13px;
}
.punchlin_heade_title1{
  color: #909399;
}
.punchlin_heade_title2{
  color: #409EFF;
}
.detailed_main_title{
  font-size: 15px;
  font-weight: 600;
  padding-top: 15px;
}
.detailed_main_title1{
  padding-bottom: 20px;
  font-weight: 600;
  font-size: 13px;
}
.detailed_main_p{
  color: #606266;
  font-weight: 400;
}
.detailed_main_p img{
  max-width: 300px;
  height: 100%;
}
.detailed_main_title2{
  font-weight: 600;
  font-size: 13px;
}
.detailed_main_imgBox{
  max-width: 300px;
  padding-top: 20px;
}
.d_page_foot{
  color: #C0C4CC;
  font-size: 13px;
  text-align: center;
  margin-top: 20px;
}
.detailed_main_img{
  width: 100%;
  height: 100%;
}
.dedetailed_main_ptailed_main_title{
  font-family:"Hiragino Sans GB";
  font-weight: 600;
}
</style>