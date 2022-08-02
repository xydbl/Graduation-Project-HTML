<template>
  <div>
    <div>
        <span>昵称</span><br>
        <input type="text" disabled><button>修改昵称</button>
    </div>
    <div class="settingEmail">
        <span>登录密码</span><br>
        <input type="password" disabled>
        <router-link to="/setting/accountSetting/settingPassWord">修改密码</router-link>
        <!-- <button>修改密码</button> -->
    </div>
    <div v-if="true" class="settingEmail">
        <router-view></router-view>
    </div>
    <div class="settingEmail">
        <span>当前邮箱</span><br>
        <input type="text" disabled><button>修改邮箱</button>
    </div>
    <div class="settingEmail">
        <span>当前手机号</span><br>
        <input type="text" disabled><button>修改手机号</button>
    </div>
    
  </div>
</template>

<script>
export default {
    name:'AccountSetting'
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