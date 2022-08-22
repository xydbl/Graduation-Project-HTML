<template>
  <div>
    <router-link to="/setting" style="set1">
    <span class="set1">设置</span>
    </router-link>
    <!-- <div class="top">
        
    </div> -->
    <div class="leftSetting">
      <div class="usrMsg">
        <!-- 头像 -->
        <div class="avatar">
          <router-link to="/setting/uploadimage">
            <!-- <el-avatar src="../assets/logo.png" style="width:70px;height:70px; position:relative;top:-50px;left:10px; float:left;">
            </el-avatar> -->
            <img v-if="user.image!=null&&user.image!=''" :src="require('../assets/userimage/'+user.image)" alt="xxxx"  class="aimage">
            <img class="aimage" v-else src="../assets/logo.png">
          </router-link>
          
          <span style="position: relative; top:-40px; left:80px">{{user.nickname}}</span>
          <!-- <div>
            <input type="text">
          </div> -->
          <span v-if="!isSig">{{user.signature}}</span>
          <input type="text" v-if="isSig" v-model="signature" style="width:150px" @keyup.enter="finishSig" @blur="giveSet" ref="getFocus">
          <el-button @click="setSig" v-if="!isSig" type="primary" icon="el-icon-edit" style="border:0; color:black;background-color: #fff; height:20px"></el-button>
        </div>
      </div>
      <!-- 基本设置 -->
      <div class="basicSetting">
        <h2>基本设置</h2>
        <router-link to="/setting/accountSetting">账号管理</router-link><hr>
        <router-link to="/setting/personalInformation">完善个人信息</router-link><hr>
      </div>
      <!-- 视图 -->
      <div class="views">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name:'Setting',
    data() {
      return {
        isSig:false,
        signature:''
      }
    },
    methods: {
      //  上传头像
      uploadImg(){
        alert("zzz")
      },
      // 个性签名
      setSig(){
        this.isSig=true
        this.signature=this.user.signature
        this.$nextTick(function(){
          this.$refs.getFocus.focus()
        })
      },
      // 修改完成
      finishSig(){
        this.isSig=false
        axios.post('http://localhost:8081/api/user/updateUserById',{
          uid:this.usMsg.uid,
          signature:this.signature
        })
        .then(res=>{
          this.$store.commit('userOptions/UPDATEUSERMESSAGE')
        },
        error=>{
          console.log(error.message);
          // alert('修改失败')
          this.$message.warning("修改失败")
        })
      },
      // 放弃修改
      giveSet(){
        this.isSig=false
      }
    },
    computed:{
      ...mapState('userOptions',{user:'user'}),
      // usMsg(){
      //   return this.$store.state.userOptions.user
      // }
    }
}
</script>

<style scoped>
.set1{
  position: relative;
  top: -50px;
  font-size: 25px;
  left: 20px;
}
.set1:hover{
  color: gray;
}
.leftSetting{
  position: absolute;
  width: 320px;
  height: 720px;
  top: 70px;
  left: 30px;
  border-radius: 4px;
  border: 1px solid black;
}
.usrMsg{
  /* text-align: center; */
  /* position: relative; */
  height: 100px;
  border-bottom: 1px solid red;
}
.avatar{
  position: relative;
  height: 100px;
  top: 60px;
  
}
.basicSetting {
  margin: 20px;
}
hr{
	border: 0;
	background-color: #ffffff;
	height: 1px;
}
.views{
  position: relative;
  height: 720px;
  width: 910px;
  /* border-left: 1px solid saddlebrown; */
  /* border: 1px solid black; */
  top: -190px;
  left: 380px;
}
.aimage{
  width: 70px;
  height: 70px;
  position:relative;
  top:-50px;
  left:10px;
  float:left;
  border-radius: 50%;
  border: 1px solid #ffffff;
}
</style>