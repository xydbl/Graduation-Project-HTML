<template>
  <div>
    <div style="font-size:18px">
      <router-link to="/personalcenter/audit/notApproved">评论管理</router-link>
      <!-- <span></span> -->
      <!-- <router-link to="/personalcenter/audit/Approved">以通过审核的评论</router-link> -->
      <span></span>
      <router-link to="/personalcenter/audit/reply">回复管理</router-link>
    </div>
   
    <div style="position: relative;top:20px">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name:'Audit'
}
</script>

<style scoped>
table{
  width: 100%;
  text-align: center;
}
span{
  cursor: pointer;
  margin: 10px;
}
</style>