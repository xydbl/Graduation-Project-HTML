<template>
  <div class="resgit">
    <div class="dv1" style="position: relative;top:30px">
      <span>用户名</span><input type="text" v-model="user.userName" @input="verifyUserName"  @blur="verifyUserName"><br>
      <div v-if="!user.isTrue" style="color:red;font-size:12px">{{msg}}</div>
    </div>
    <div class="dv1" style="position: relative;top:90px">
      <span>密码</span><input type="password" v-model="user.passWord" @input="verifyPassWord" @blur="verifyPassWord">
      <div v-if="!user.verifyPass" style="color:red;font-size:12px">{{msg1}}</div>
    </div>
    <div class="dv1" style="position: relative;top:80px">
      <span>确认密码</span><input type="password" v-model="user.checkPass" @input="verifyCheckPassWord" @blur="verifyCheckPassWord">
      <div v-if="!user.verifyCheckPass" style="color:red;font-size:12px">{{msg2}}</div>
    </div>
    <input type="button" value="注册" @click="verifyLogin" style="position: relative;top:60px">
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Register',
    data() {
      return {
        user: {
            userName:'',
            passWord: '',
            checkPass: '',
            userType:'5',
            isTrue:true,
            verifyPass:true,
            verifyCheckPass:true
        },
        msg:'用户名不可用',
        msg1:'密码不可为空',
        msg2:'密码不一致',
      };
    },
    methods: {
      // 验证用户名是否可用
      registerSelect(){
        axios.post('http://localhost:8080/user/registerSelect',{
          username:this.user.userName
        })
        .then(res=>{
          if(!this.user.isTrue){
            this.msg='用户名不可用'
          }
          this.user.isTrue= res.data
        },
        error=>{
          console.log(error.message)
        })
      },
      // 验证用户名是否为空
      verifyUserName(){
        if(this.user.userName==''){
          this.msg='用户名为空'
          this.$nextTick(function(){
            this.user.isTrue=false
          })
        }else{
          this.registerSelect()
        }
      },
      // 验证密码是否符合要求
      verifyPassWord(){
        let reg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
        if(this.user.passWord!=''){
          if(reg.test(this.user.passWord)){
            this.user.verifyPass=true
          }else{
            this.msg1='必须包含大小写字母和数字的组合,不能使用特殊字符,长度在6-15之间'
            this.$nextTick(function(){
              this.user.verifyPass=false
            })
          }
        }else{
          this.msg1='密码不可为空'
          this.$nextTick(function(){
            this.user.verifyPass=false
          })
        }
      },
      // 验证密码是否一致
      verifyCheckPassWord(){
        
        if(this.user.passWord!=this.user.checkPass){
          this.user.verifyCheckPass=false
        }else{
          this.user.verifyCheckPass=true
        }
      },
      // 注册验证
      verifyLogin(){
        this.verifyUserName()
        this.verifyPassWord()
        this.$nextTick(function(){
          if(this.user.isTrue==true&&this.user.verifyPass==true&&this.user.verifyCheckPass==true){
            this.login()
          }else{
            return false
          }
        })
      },
      //注册
      login() {
        axios.post('http://localhost:8080/user/adduser',
          {
            username:this.user.userName,
            password:this.user.passWord,
            usertype:this.user.userType,
            date1:new Date()
          }
        ).then(res=>{
          alert('注册成功')
        },error=>{
          alert('注册失败')
          console.log(error.message);
        })
      },
      
    },
}
</script>

<style scoped>
.resgit{
  position: relative;
  left: 950px;
  height: 350px;
  width: 400px;
  text-align: right;
}
input{
  height: 40px;
  width: 300px;
}
.dv1{
  height: 80px;
}
span{
	padding-right: 15px;
}
</style>