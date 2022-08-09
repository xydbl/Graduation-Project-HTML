<template>
  <div >
    <span>请输入当前用户密码</span><br>
    <input type="password" v-model="oldPassWord"><br>
    <span>请输入新密码</span><br>
    <input type="password" v-model="newPassWord" @input="verifyPassWord" @blur="verifyPassWord"><br>
    <span v-if="isOk" style="font-size:10px;color:red;">{{msg1}}</span><br>
    <span>请再次输入新密码</span><br>
    <input type="password" v-model="newPassWord1" @blur="consistent" @input="consistent"><br>
    <span v-if="isInconsistent" style="font-size:10px;color:red;">{{msg}}</span><br>
    <button @click="settingFinish">修改完成</button>
  </div>
</template>

<script>
export default {
    name:'SettingPassWord',
    data(){
      return {
        oldPassWord:'',
        newPassWord:'',
        newPassWord1:'',
        isOk:false,
        isInconsistent:false,
        msg:'两次输入的新密码不一致或新密码为空',
        msg1:'新密码不可为空'
        // 必须包含大小写字母和数字的组合,不能使用特殊字符,长度在6-15之间
      }
    },
    methods: {
      consistent(){
        if(this.newPassWord==this.newPassWord1 &&this.newPassWord!=''&&this.newPassWord1!=''){
          this.isInconsistent=false
        }else{
          this.isInconsistent=true
        }
      },
      // 验证新密码
      verifyPassWord(){
        let reg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
        if(this.newPassWord!=''){
          this.isOk=false
          if (reg.test(this.newPassWord)) {
            this.isOk=false
          }else{
            this.msg1='必须包含大小写字母和数字的组合,不能使用特殊字符,长度在6-15之间'
            this.$nextTick(function(){
              this.isOk=true
            })
          }
        }else{
          this.isOk=true
        }
      },
      settingFinish(){
        this.consistent()
        this.verifyPassWord()
        this.$nextTick(function(){
          if(!this.isInconsistent&&!this.isOk){
            this.$store.state({user:'user'})
            if(this.oldPassWord==user.passWord){
              this.$axios.post('http://loclhost:8080/user/')
              .then(res=>{
                this.$router.back()
              },
              error=>{
                console.log(error.message);
              })
            }
          }
        })
      }
    },
}
</script>

<style scoped>
input{
    margin-top: 20px;
    height: 26px;
}
span{
    margin-top: 10px;
}
button{
    /* margin-top: 5px; */
    height: 34px;
}
</style>