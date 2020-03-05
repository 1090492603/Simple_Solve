<template>
  <div>
      <div class="car_box" >
        <el-carousel height="300px" class="Rotation_chart">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
      </div>
  </div>
</template>

<script>
export default {
    name:'index',
    data(){

        return{

        }

    }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #303133;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .Rotation_chart{
     width: 80%;
     margin: 0 auto;
  }
</style>