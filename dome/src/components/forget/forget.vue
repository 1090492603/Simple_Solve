<template>
  <div>
    <div class="main-container">
      <main class="main_box">
          <form>
            <h1>
                修改密码
            </h1>
            <div class="popup_login">
                <div class="input-box" v-for="(item,index) in popupList" :key="index">
                <input :type="item.type" :maxlength="item.maxlen" :placeholder="item.key" class="popup_input" v-model="item.value">
                <input type="button" class="send-vcode-btn" v-if="item.btn" @click="send" :disabled="isSend" :class="{'vcode-btn':isSend}" :value="checkCode" />
                </div>
            </div>
            <div class="f_btn">
                <el-button type="primary" class="btn" @click="click_btn" :disabled="isbtn">确定</el-button>
            </div>
            <div>
                返回首页
            </div>
          </form>
      </main>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            popupList : [],
            popupList1:[
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
            ],
            isSend:false
        }
    },
    create(){

    },
    methods:{

    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.main-container{
    width: 100%;
}
.main_box{
    margin: 0 auto;
}
</style>