<template>
  <div>
    <div class="leftSetting">
      <div class="usrMsg">
        <!-- 头像 -->
        <div class="avatar">
          <el-avatar src="" style="width:70px;height:70px; position:relative;top:-50px;left:10px; float:left;"></el-avatar>
          <span style="position: relative; top:-40px; left:80px">昵称</span>
          <!-- <div>
            <input type="text">
          </div> -->
          <span>个性签名</span>
        </div>
      </div>
      <!-- 基本设置 -->
      <div class="basicSetting">
        <h2>基本设置</h2>
        <router-link to="/setting/accountSetting">账号管理</router-link><br>
        <router-link to="/setting/personalInformation">完善个人信息</router-link><br>
      </div>
      <!-- 视图 -->
      <div class="views">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Setting'
}
</script>

<style scoped>
.leftSetting{
  position: relative;
  width: 320px;
  height: 720px;
  top: 20px;
  left: 30px;
  border-radius: 4px;
  border: 1px solid black;
}
.usrMsg{
  /* text-align: center; */
  height: 100px;
  border-bottom: 1px solid red;
}
.avatar{
  position: relative;
  height: 100px;
  /* top: px; */
}
.views{
  position: relative;
  height: 720px;
  width: 910px;
  /* border: 1px solid black; */
  top: -190px;
  left: 380px;
}
</style>