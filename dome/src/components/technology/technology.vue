<template>
  <div class="tec-container">
    <div class="t_container" v-for="(item, index) in tecArr" :key="index" ref="container">
      <div class="t-title" ref="tTitle">
        <div class="t-title-img" ref="mytec">
          <el-image class="imgeblur" :src="tecArr[index].imgurl" fit="cover"></el-image>
        </div>
        <div
          class="title-label"
          ref="mytec2"
          @mouseover.stop="mouseEnter($event, index)"
          @mouseleave.stop="mouseLeave($event, index)"
        >
          {{item.title}}
          <hr class="c_hr" />
          <div ref="mytec3" style="-webkit-box-sizing: content-box;box-sizing: content-box;">
            {{item.msg}}
            <div class="a-box">
              <el-link :href="item.url" target="_blank" :underline="false">了解更多</el-link>
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
  name: "technology",
  data() {
    return {
      pathname : "technology",
      timer: "",
      tecArr: [
        {
          id: 1,
          title: "第五代移动通信技术",
          imgurl:
            "https://tse3-mm.cn.bing.net/th/id/OIP.Bm5F_CGq6IS31kCdgLaqTAHaHa?w=195&h=195&c=7&o=5&dpr=1.5&pid=1.7",
          url: "https://www.zhihu.com/topic/19565565/intro",
          msg:
            "第五代移动通信技术（简称5G或5G技术）是最新一代蜂窝移动通信技术，也是即4G（LTE-A、WiMax）、3G（UMTS、LTE）和2G（GSM）系统之后的延伸。5G的性能目标是高数据速率、减少延迟、节省能源、降低成本、提高系统容量和大规模设备连接。"
        },
        {
          id: 2,
          title: "人工智能",
          imgurl:
            "https://tse2-mm.cn.bing.net/th/id/OIP.DYZ5ylREl-8SRpid5BFwmQHaHa?w=218&h=212&c=7&o=5&dpr=1.5&pid=1.7",
          url: "https://www.zhihu.com/topic/19551275/hot",

          msg:
            "人工智能（Artificial Intelligence），英文缩写为AI。它是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。"
        },
        {
          id: 3,
          title: "虚拟现实",
          imgurl:
            "https://tse3-mm.cn.bing.net/th/id/OIP.Fq9VnVqP6LYjRlHJmDs6EwHaHa?w=204&h=204&c=7&o=5&dpr=1.5&pid=1.7",
          url: "https://www.zhihu.com/topic/19595537/index",
          msg:
            "虚拟现实技术(英文名称：Virtual Reality，缩写为VR)，又称灵境技术，是20世纪发展起来的一项全新的实用技术。虚拟现实技术囊括计算机、电子信息、仿真技术于一体，其基本实现方式是计算机模拟虚拟环境从而给人以环境沉浸感。随着社会生产力和科学技术的不断发展，各行各业对VR技术的需求日益旺盛。VR技术也取得了巨大进步，并逐步成为一个新的科学技术领域。"
        },
        {
          id: 3,
          title: "区块链技术",
          imgurl:
            "https://cn.bing.com/th/id/OIP.gz40t9hwzWNl4Nnu9fFylwHaED?pid=Api&rs=1",
          url: "https://www.zhihu.com/topic/19901773/intro",
          msg:
            "从本质上讲，它是一个共享数据库，存储于其中的数据或信息，具有“不可伪造”“全程留痕”“可以追溯”“公开透明”“集体维护”等特征。基于这些特征，区块链技术奠定了坚实的“信任“基础，创造了可靠的“合作”机制，具有广阔的运用前景。"
        },
        {
          id: 1,
          title: "物联网",
          imgurl:
            "https://cn.bing.com/th/id/OIP.sQtzz3AGoDGcy4Bf3v5UPAHaDt?pid=Api&rs=1",
          url: "https://www.zhihu.com/topic/19551271/hot",
          msg:
            "物联网（ IoT ，Internet of things ）即“万物相连的互联网”，是互联网基础上的延伸和扩展的网络，将各种信息传感设备与互联网结合起来而形成的一个巨大网络，实现在任何时间、任何地点，人、机、物的互联互通"
        },
        {
          id: 2,
          title: "量子计算机",
          imgurl:
            "https://www.qtumist.com/wp-content/uploads/2018/05/tim99g-480x300.jpg",
            url:"https://www.zhihu.com/topic/19938157/hot",
          msg:
            "量子计算机，简单地说，它是一种可以实现量子计算的机器，是一种通过量子力学规律以实现数学和逻辑运算，处理和储存信息能力的系统。它以量子态为记忆单元和信息储存形式，以量子动力学演化为信息传递与加工基础的量子通讯与量子计算，在量子计算机中其硬件的各种元件的尺寸达到原子或分子的量级。"
        },
        {
          id: 3,
          title: "大数据",
          url: "https://www.zhihu.com/topic/19740929/hot",
          imgurl:
            "https://cn.bing.com/th/id/OIP.FyR3cHVUfXKtgqlW-sGMCgHaED?pid=Api&rs=1",
          msg:
            "“大数据”是需要新处理模式才能具有更强的决策力、洞察发现力和流程优化能力来适应海量、高增长率和多样化的信息资产"
        },
        {
          id: 3,
          title: "生物科学技术",
          imgurl:
            "https://cn.bing.com/th?id=OIP.jzxrN1TLnbbBiJbpC096CQHaE8&pid=Api&rs=1",
          url: "https://www.zhihu.com/topic/19619633/hot",
          msg:
            "“生物科学技术”简称“生物科技”，根据比较权威的定义，生物科技指的是利用“生物体（含动物，植物及微生物）”来生产有用的物质或改进制成，改良生物的特性，以降低成本及创新物种的科学技术。进行对人类医学、环境、农业食粮等不同范畴之一项技术。"
        }
      ]
    };
  },
  created(){
    Bus.$emit("headerChange", this.pathname);
  },
  methods: {
    mouseEnter: function(event, index) {
      this.$refs.mytec2[index].style.height = "300px";
      this.$refs.mytec3[index].style.color = "#fafafa";
      this.$refs.mytec2[index].style.paddingTop = "10px";
      this.$refs.mytec2[index].style.color = "#fafafa";
      // this.$refs.container[index].style.boxShadow = "0px 5px 20px #999999";
      var rgbaNum = 0;
      var filterNum = 0;
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (filterNum < 10) {
            filterNum += 0.5;
            rgbaNum += 0.03;
            this.$refs.mytec[index].style.filter =
              "blur" + "(" + filterNum + "px" + ")";
            this.$refs.mytec2[index].style.background =
              "rgba(0,0,0," + rgbaNum + ")";
          }
        }, 10);
      }
    },
    mouseLeave: function(event, index) {
      // this.$refs.container[index].style.boxShadow = "";
      this.activeColor = "#999999";
      clearInterval(this.timer);
      this.timer = "";
      this.$refs.mytec[index].style.filter = "";
      this.$refs.mytec2[index].style.color = "#333333";
      this.$refs.mytec3[index].style.color = "#999999";

      this.$refs.mytec2[index].style.height = "62px";
      this.$refs.mytec2[index].style.paddingTop = "170px";
      this.$refs.mytec2[index].style.background = "";
    },
    dumpOthers: function(event, item) {
      console.log(item);
    }
  }
  // ,
  // created() {
  //   this.$axios.get("/xxx").then(res => {
  //     if (res.data.errno == 0) {
  //        this.tecArr = res.data;
  //     }
  //   });
  // }
};
</script>

<style>
.c_hr {
  border: 0.5px solid rgba(255, 255, 255, 1);
  margin:0 ;
}
body {
  background-color: #f3f3f3;
}
.tec-container {
  display: flex;
  padding: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #f3f3f3;
}
.t-title {
  width: 260px;
  height: 300px;
  background-color: #ffffff;
  position: relative;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
}
.t-title-img {
  width: 260px;
  height: 290px;
}
.imgeblur {
  /* filter: blur(5px); */
  width: 100%;
  height: 50%;
}
.title-label {
  width: 220px;
  height: 62px;
  position: absolute;
  bottom: 0px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 170px;
  color: #333333;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 3px;

  font-weight: 600;
  top: 0;
  overflow: hidden;
}
.title-label div {
  font-size: 12px;
  margin-top: 10px;
  line-height: 14px;
  letter-spacing: 3px;
  font-weight: 500;
  color: #999999;
  height: 30px;
}
.a-box {
  width: 100px;
  height: 30px !important;
  line-height: 30px !important;
  text-align: center;
  border: 0.5px solid #ffffff;
  margin: 0 auto;
  /* position: absolute; */
  bottom: 0px;
}
.a-box a {
  color: #ffffff !important;
  height:30px;
  width: 100px;
  
}
.a-box:hover {
  background-color: #6335f1;
  border: 0;
}
.t-title-img{
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  background: #ffffff;
}
.imgeblur{
  -webkit-box-sizing: content-box;
  box-sizing: content-box;;
}
.title-label{
  -webkit-box-sizing: content-box;
  box-sizing: content-box;;
}
a:visited{
  text-decoration: none;
}
</style>