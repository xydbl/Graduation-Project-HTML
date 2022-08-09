<template>
  <div>
    <!-- <div class="block">
      <span>请输入昵称</span><br>
      <input type="text" v-model="nickname">
    </div>
    <div class="block">
      <span>请输入个性签名</span><br>
      <input type="text" v-model="signature">
    </div>
    <div class="block">
        <span>请输入邮箱</span><br>
        <input type="text" v-model="email">
    </div>
    <div class="block">
        <span>请输入手机号</span><br>
        <input type="text" v-model="phone">
    </div> -->
    <div>
        <template>
            <div class="block">
                <span class="demonstration">出生年月</span><br>
                <el-date-picker
                  v-model="birthday"
                  type="date"
                  placeholder="选择日期" 
                  format="yyyy 年 MM 月 dd 日">
                </el-date-picker>
            </div>
        </template>
    </div>
    <div class="block">
      <button @click="setFinish">修改/完成</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'PersonalInformation',
    data() {
      return {
        // nickname:'',
        // signature:'',
        // email:"",
        // phone:"",
        birthday: '',
      };
    },
    methods: {
      setFinish(){
        axios.post('http://localhost:8080/user/updateUserById',{
          uid:this.uMsg.uid,
          birthday:this.birthday
        }).then(res=>{
          alert('完成')
        },
        error=>{
          console.log(error.message);
        })
      }
    },
    computed:{
      uMsg(){
        return this.$store.state.userOptions.user
      }
    }
}
</script>

<style scoped>
.block{
    margin-top: 20px;
}
input{
    height: 30px;
    margin-top: 20px;

}
</style>