<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>封面</td>
          <td>标题</td>
          <td>浏览时间</td>
          <td>删除</td>
        </tr>
      </thead>
      <tbody>
        <tr valign=middle bgcolor=#E3E7EB>
          <td><img src="../assets/logo.png" alt="" style="width:160px;height:90px;"></td>
          <td>
            <router-link to="/blog">xxxxxxxxx</router-link>
          </td>
          <td>2020-12-31</td>
          <td><i class="el-icon-delete" @click="delHist" circle style="background-color: #E3E7EB;border: 0;color: red;cursor: pointer;"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 历史记录 或 访问记录 或
export default {
    name:'HistoryRecord',
    methods: {
      delHist(){
        alert('删除')
      }
    },
}
</script>

<style scoped>
table{
	width: 100%;
  text-align: center;
}
</style>