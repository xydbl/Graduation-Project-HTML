<template>
  <div>
    <table>
        <thead>
            <tr>
              <td>评论内容</td>
              <td>评论人</td>
              <td>评论时间</td>
              <td>通过审核或删除</td>
            </tr>
        </thead>
        <tbody>
            <tr valign=middle bgcolor=#E3E7EB>
              <td></td>
              <td></td>
              <td></td>
              <td><span style="color: red;">删除</span></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name:'Approved'
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