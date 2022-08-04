<template>
  <div>
    <div>
        <div v-if="true">
            <span>昵称</span><br>
            <input type="text" disabled :value="urMsg.nickname"><button>修改昵称</button><br>
        </div>
        <div v-if="false">
            <span>请输入新昵称:</span><input type="text"><button>修改完成</button>
        </div>
    </div>
    <div class="settingEmail">
        <span>登录密码</span><br>
        <input type="password" disabled :value="urMsg.passWord">
        <router-link to="/setting/accountSetting/settingPassWord">修改密码</router-link>
        <!-- <button>修改密码</button> -->
    </div>
    <div v-if="true" class="settingEmail">
        <router-view></router-view>
    </div>
    <div class="settingEmail">
        <span>当前邮箱</span><br>
        <input type="text" disabled :value="urMsg.email"><button>修改邮箱</button>
    </div>
    <div v-if="false">
        <span>请输入新的邮箱</span><br>
        <input type="text">
    </div>
    <div class="settingEmail">
        <span>当前手机号</span><br>
        <input type="text" disabled :value="urMsg.phone"><button>修改手机号</button>
    </div>
    <div v-if="false">
        <span>请输入新的手机号</span><br>
        <input type="text">
    </div>
  </div>
</template>

<script>
export default {
    name:'AccountSetting',
    data() {
        return {
            urMsg:''
        }
    },
    methods: {
        // 数据更新
        // dataUpdate(){
        //     this.urMsg=this.uMsg
        // }
    },
    computed:{
        uMsg(){
            return this.$store.state.userOptions.user
        }
    },
    mounted() {
        this.urMsg=this.uMsg
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
</style>