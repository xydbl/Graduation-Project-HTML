<template>
  <div>
    <div>
        <div v-if="!updateN">
            <span>昵称</span><br>
            <input type="text" disabled :value="uMsg.nickname"><button @click="changeUpdateN">修改昵称</button><br>
        </div>
        <div v-if="updateN">
            <span>请输入新昵称:</span><br><input type="text" v-model="usr.nickname" @keyup.enter="updateName" 
            ref="focus1">
            <button @click="changeUpdateN">取消修改</button>
            <button @click="updateName">修改完成</button>
        </div>
    </div>
    <div class="settingEmail">
        <span>登录密码</span><br>
        <input type="password" disabled :value="uMsg.passWord">
        <router-link to="/setting/accountSetting/settingPassWord" ><button v-if="!updatePass" @click="changeUpdatePass">修改密码</button ></router-link><button v-if="updatePass" @click="returnOne">取消修改</button>
        <!-- <button>修改密码</button> -->
    </div>
    <div class="settingEmail">
        <router-view></router-view>
    </div>
    <div class="settingEmail" v-if="!updateE">
        <span>当前邮箱</span><br>
        <input type="text" disabled :value="uMsg.email"><button @click="changeEmail">修改邮箱</button>
    </div>
    <div v-if="updateE" style="margin-top:40px">
        <span>请输入新的邮箱</span><br>
        <input type="text" v-model="usr.email" @keyup.enter="updateEmail" ref="focus2">
        <button @click="changeEmail">修改取消</button>
        <button @click="updateEmail">修改完成</button>
    </div>
    <div class="settingEmail" v-if="!updateP">
        <span>当前手机号</span><br>
        <input type="text" disabled :value="uMsg.phone"><button @click="changePhone">修改手机号</button>
    </div>
    <div v-if="updateP" style="margin-top:40px">
        <span>请输入新的手机号</span><br>
        <input type="text" v-model="usr.phone" @keyup.enter="updatePhone" ref="focus3">
        <button @click="changePhone">取消修改</button>
        <button @click="updatePhone">修改完成</button>
    </div>
  </div>
</template>

<script>
export default {
    name:'AccountSetting',
    data() {
        return {
            updateN:false,
            updatePass:false,
            updateE:false,
            updateP:false,
            usr:{
                nickname:'',
                email:'',
                phone:''
            }
        }
    },
    methods: {
        // 修改昵称
        changeUpdateN(){
            this.updateN=!this.updateN
            this.$nextTick(function(){
                if(this.updateN){
                    this.$refs.focus1.focus()
                }
            })
        },
        updateName(){
            this.updateN=false
            this.$axios.post('http://localhost:8081/api/user/updateUserById',{
                uid:this.uMsg.uid,
                nickname:this.usr.nickname
            }).then(res=>{
                this.$store.commit('userOptions/UPDATEUSERMESSAGE')
            },
            error=>{
                console.log(error.message);
            })
        },
        // 密码
        changeUpdatePass(){
            this.updatePass=true
        },
        // 跳转页面
        returnOne(){
            this.updatePass=false
            this.$nextTick(function(){
                this.$router.push({path:'/setting/accountSetting'})
            })
        },
        // 邮箱
        changeEmail(){
            this.updateE=!this.updateE
            this.$nextTick(function(){
                if(this.updateE){
                    this.$refs.focus2.focus()
                }
            })
        },
        updateEmail(){
            this.updateE=false
            this.$axios.post('http://localhost:8081/api/user/updateUserById',{
                uid:this.uMsg.uid,
                email:this.usr.email
            }).then(res=>{
                this.$store.commit('userOptions/UPDATEUSERMESSAGE')
            },
            error=>{
                console.log(error.message);
            })
        },
        // 电话
        changePhone(){
            this.updateP=!this.updateP
            this.$nextTick(function(){
                if(this.updateP){
                    this.$refs.focus3.focus()
                }
            })
        },
        updatePhone(){
            this.updateP=false
            this.$axios.post('http://localhost:8081/api/user/updateUserById',{
                uid:this.uMsg.uid,
                phone:this.usr.phone
            }).then(res=>{
                this.$store.commit('userOptions/UPDATEUSERMESSAGE')
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
    },
    mounted() {
        // 初始化
        this.urMsg=this.uMsg
        this.updateN=false
        this.updatePass=false
        this.updateE=false
        this.updateP=false
        this.usr.nickname=this.uMsg.nickname
        this.usr.email=this.uMsg.email
        this.usr.phone=this.uMsg.phone
    },
}
</script>

<style scoped>
.settingEmail{
    margin-top: 40px;
}
input{
    margin-top: 10px;
    height: 30px;
}
button{
    margin-left: 20px;
    height: 34px;
}
</style>