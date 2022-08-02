<template>
  <div>
    <div class="block">
      <span>请输入昵称</span><br>
      <input type="text">
    </div>
    <div class="block">
      <span>请输入个性签名</span><br>
      <input type="text">
    </div>
    <div class="block">
        <span>请输入邮箱</span><br>
        <input type="text" v-model="email">
    </div>
    <div class="block">
        <span>请输入手机号</span><br>
        <input type="text" v-model="phone">
    </div>
    <div>
        <template>
            <div class="block">
                <span class="demonstration">出生年月</span><br>
                <el-date-picker
                v-model="birthday"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
        </template>
    </div>
  </div>
</template>

<script>
export default {
    name:'PersonalInformation',
    data() {
      return {
        email:"",
        phone:"",
        birthday: '',
      };
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