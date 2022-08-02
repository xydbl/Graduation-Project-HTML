<template>
  <div >
    <span>请输入当前用户密码</span><br>
    <input type="password"><br>
    <span>请输入新密码</span><br>
    <input type="password"><br>
    <span>请在次输入新密码</span><br>
    <input type="checkPass">
  </div>
</template>

<script>
export default {
    name:'SettingPassWord'
}
</script>

<style scoped>
input{
    margin-top: 20px;
    height: 26px;
}
</style>