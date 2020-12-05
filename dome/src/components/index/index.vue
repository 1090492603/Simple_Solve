<template>
  <div>
    <div class="car_box car">
      <el-carousel height="520px" class="Rotation_chart">
        <el-carousel-item v-for="item in BannerList" :key="item.id">
          <img style="width: 100%; height: 100%" :src="item.link"> 
        </el-carousel-item>
      </el-carousel>
      <div class="imgbox">
        <div class="middle_img" v-for="(item,index) in imgList" :key="index">
          <img :src="item.src" :alt="item.title" class="middle_img_img" />
          <div class="img_font">
            <div class="imgTitle">{{item.title}}</div>
            <div class="imgBody">{{item.font}}</div>
          </div>
        </div>
      </div>
      <div class="middle2_header car">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo middle_menu"
          mode="horizontal"
          @select="SelectNuber"
        >
          <el-menu-item index="1">推荐</el-menu-item>
          <el-menu-item index="2">精选社区</el-menu-item>
        </el-menu>
      </div>
      <div class="middle2_body bodyStyle">
        <el-container>
          <el-main>
            <div class="middle2_box" v-for="item in FeaturedList" :key="item.id||item.question_id">
              <div class="middle2_boxImg">
                <el-image :key="item.link" :src="item.link" class="middle2_Img" lazy></el-image>
              </div>
              <div class="fontBox">
                <div class="font_title" ><a href="javascript:void(0);" @click="open(item.id||item.question_id)" >{{item.name||item.question}}</a></div>
                <div class="font_body" v-html="item.article||item.answer"></div>
                <!--    <div class="font_data">高飞 2020-2-18</div> -->
              </div>
            </div>

            <div class="middle2_box_foot">
              <el-button type="warning" class="foot_buttom"   @click='open_puchline()' plain>了解更多</el-button>
            </div>
          </el-main>
          <el-aside width="235px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="aside_title">热词</span>
                <span class="aside_date">{{WordTime}}</span>
              </div>
              <div v-for="(item,index) in HotWordList" :key="item.id" class="text item">
                <div class="list_number">{{index+1}}</div>
                <div class="list_font">{{item.name}}</div>
              </div>
              <div class="aside_button">了解更多</div>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="aside_title">热梗</span>
                <span class="aside_date">{{StemTime}}</span>
              </div>
              <div v-for="(item,index) in getHotStem" :key="item.id" class="text item">
                <div class="list_number">{{index+1}}</div>
                <div class="list_font">{{item.name}}</div>
              </div>
              <div class="aside_button">了解更多</div>
            </el-card>
          </el-aside>
        </el-container>
      </div>
      <div class="foot-page-bg">
        <div class="footPage">
          <div class="foot">科技推荐</div>
          <div class="foot_technology">
            <div class="foot_boxImg" v-for="(item , index) in footimg" :key="index">
              <img :key="item.src" :src="item.src" class="middle2_Img" >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../../build/bus.js'
export default {
  
  name: "index",
  data() {
    return {
      imgList: [
        {
          src: require("../../assets/images/首页_03.jpg"),
          title: "易解科技",
          font: "搜集科技专题，搜集热门科学技术"
        },
        {
          src: require("../../assets/images/首页_05.jpg"),
          title: "易解流行语",
          font: "最新的流行语，流行梗，流行的科技词汇集合"
        },
        {
          src: require("../../assets/images/首页_07.jpg"),
          title: "易解社区",
          font: "每日推荐时下热门话题"
        }
      ],
      footimg: [
        {
          src: require("../../assets/images/首页_04.jpg")
        },
        {
          src: require("../../assets/images/首页_08.jpg")
        },
        {
          src: require("../../assets/images/首页_09.jpg")
        }
      ],
      HotWordList: [],
      getHotStem: [],
      BannerList: [],
      user: [],
      FeaturedList: [],
      WordTime: "",
      StemTime: "",
      activeIndex: "1",
      nowData:"首页推荐",
      pathname:"punchline"
    };
  },
  created() {
    this.$axios.get("/index/getBanner").then(res => {
      console.log(res.data);
      if (res.data.errno == 0) {
        this.BannerList = res.data.data;
      }
    });
    this.$axios
      .get("/index/getFeatured")
      .then(res => {
        console.log(res.data);
        if (res.data.errno == 0) {
          this.FeaturedList = res.data.data;
        }
      })
      .catch(err => {
        console.log("错误");
      });

    this.$axios
      .get("/index/getHotWord")
      .then(res => {
        console.log(res.data);
        if (res.data.errno == 0) {
          this.HotWordList = res.data.data.data;
          this.WordTime = res.data.data.time;
          
          console.log("221");
          console.log(this.HotWordList);
        }
      })
      .catch(err => {
        console.log("错误");
      });

    this.$axios
      .get("/index/getHotStem")
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.errno == 0);
        if (res.data.errno == 0) {
          this.getHotStem = res.data.data.data;
          this.StemTime = res.data.data.time;
        }
      })
      .catch(err => {
        console.log("错误");
      });


  },
  methods: {
    SelectNuber(key, keyPath) {
      if (key == 1) {
        this.$axios
          .get("/index/getFeatured")
          .then(res => {
            console.log(res.data);
            if (res.data.errno == 0) {
              this.FeaturedList = res.data.data;
              this.nowData = "首页推荐";
              this.pathname = "community"
            }
          })
          .catch(err => {
            console.log("错误");
          });

      } else if (key == 2) {
        this.$axios
          .get("/index/getFeaturedAnswer")
          .then(res => {
            console.log(res.data);
            if (res.data.errno == 0) {
              this.FeaturedList = res.data.data;
              this.nowData = "社区精选";
              this.pathname = "community"
            }
          })
          .catch(err => {
            console.log("错误");
          });
      }
    },
    open(id){
          this.$router.push({
              name:'detailed',        
              query: {
                 Nowtitle: this.nowData, id: id, pathname: this.pathname
              }
            });
    },
    open_puchline(){
      console.log(this.pathname);
            Bus.$emit("headerChange", this.pathname);
            this.$router.push({
              name:this.pathname       
            });
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #303133;
  font-size: 14px;
  opacity: 0.75;
  line-height: 160px;
  margin: 0;
}
.car_box{
  min-width: 930px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-main {
  padding: 10px 20px 20px 20px;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.Rotation_chart {
  width: 100%;
  margin: 0 auto;
}
.imgbox {
  margin: 0 auto;
  display: flex;
  padding-top: 20px;
  background-color: #fafafa;
}
.middle_img {
  padding: 12px 30px 5px 30px;
  width: 33.3%;
  height: 220px;
  display: flex;
  flex-flow: column ;
  align-items :center;

}
.imgTitle {
  text-align: center;
  width: 100%;
}
.imgBody {
  text-align: center;
  padding-top: 8px;
  font-size: 12px;
  color: #606266;
}
.middle2_header {
  padding-top: 10px;
  margin: 0 auto;
}
.middle2_header .el-menu--horizontal > .el-menu-item {
  line-height: 45px;
  height: 45px;
}
.bodyStyle {
  width: 1000px;
  margin: 0 auto;
}
.middle2_body {
  width: 100%;
}
.middle2_boxImg {
  height: 150px;
  width: 200px;
}
.middle2_box {
  display: flex;
  padding: 20px 0;
}
.middle2_Img {
  height: 100%;
  width: 100%;
}
.car {
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  box-sizing: border-box;
}
.middle_img_img {
  width: 150px;
  height: 150px;
}
.fontBox {
  width: 700px;
  height: 150px;
  line-height: 20px;
  padding-left: 20px;
  position: relative;
}
.fontBox div {
  padding-top: 10px;
}
.font_title {
  white-space: nowrap;
  font-size:18px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}
.font_body {
  overflow: hidden;
  font-size: 14px;
  color: #666666;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.font_data {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  right: 0;
  bottom: 0px;
}
.middle2_box_foot {
  height: 50px;
  width: 80%;
  margin: 0 auto;
  position: relative;
}
.foot {
  padding-top: 20px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 17px;
}
.foot-page-bg {
  width:100%;
  background-color: #fafafa;
}
.footPage {
  width: 100%;
  margin: 0 auto;
  height: 400px;
  background-image: url("../../assets/images/首页_12.jpg");
}
.foot_technology {
  display: flex;
  width: 65%;
  margin: 0 auto;
}
.foot_boxImg {
  width: 28%;
  padding:50px 30px 0px;
}
.item {
  margin-bottom: 18px;
  display: flex;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
  position: absolute;
  top: 55px;
  width: 35px;
  height: 3px;
  background: #303133;
}
.el-aside {
  margin-right: 30px;
}

.box-card {
  width: 232px;
  margin-top: 30px;
  position: relative;
}
.aside_title {
  color: #303133;
  padding-right: 20px;
}
.clearfix {
  height: 20px;
}
.aside_date {
  font-size: 11px;
  color: #666666;
}
.list_number {
  border: 1px solid #999999;
  line-height: 16px;
  width: 18px;
  text-align: center;
  border-radius: 3px;
  font-size: 10px;
  color: #999999;
  margin: auto 0;
}
.list_font {
  line-height: 18px;
  font-size: 14px;
  height: 100%;
  width: 100%;
  margin-left: 20px;
  margin: auto 0 auto 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.aside_button {
  line-height: 34px;
  height: 34px;
  width: 100%;
  font-size: 14px;
  color:#999999;
  text-align: center;
  background: #f1f1f1;
}

.aside_button:hover {
  background-color: #FF5718;
  color: #ffffff;
}
.foot_buttom {
  position: absolute;
  right: 0;
}
a:link{
  color: #303133;
  text-decoration:none;
}
a:hover{
    color:#409EFF;
}
</style>