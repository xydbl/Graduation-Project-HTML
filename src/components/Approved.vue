<template>
  <div>
    <table>
        <thead>
            <tr>
              <td>选择</td>
              <td>评论内容</td>
              <td>评论人</td>
              <td>评论时间</td>
              <td><button @click="delChecked">删除选中</button></td>
            </tr>
        </thead>
        <tbody>
            <tr valign=middle bgcolor=#E3E7EB v-for="li in list" :key="li.cid">
              <td><input type="checkbox" :checked="li.checked" @change="checked1(li)"></td>
              <td>{{li.message}}</td>
              <td>{{li.messageId}}</td>
              <td>{{li.ctime}}</td>
              <td><span style="color: red;" @click="deleteComm(li.cid,li.clogId)">删除</span></td>
            </tr>
        </tbody>
    </table>
    
  </div>
</template>

<script>
import {mapState, mapMutations } from 'vuex'
export default {
    name:'Approved',
    data() {
      return {
        list:[],
      }
    },
    methods: {
      ...mapMutations('commentaryOptions',{currentCommentary:'CURRENTCOMMENTARY'}),
      // 过滤 commentaryList
      getApproved(){
        this.list=this.commentaryList
        this.list=this.list.filter((li)=>{
          return li.ctype==1
        })
      },
      // 选择
      checked1(li){
        let x
        if(!li.checked){
          if(li.checked==null||li.checked==undefined){
            this.$set(li,'checked',true)
          }else{
            li.checked=true
          }
        }else{
          li.checked=false
        }
        // this.list.forEach(li=>{
        //   if(li.checked) 
        // })
      },
      // 选中所有 或取消
      checkAllComm(){
        this.list=this.list.forEach(li=>{
          li.checked=this.checkAll
        })
      },
      //  删除评论
      deleteComm(cid,bid){
        this.$axios.get(`http://localhost:8081/api/commentary/del/${cid}`)
        .then(res=>{
          if(res.data){
            alert('删除成功')
            this.currentCommentary(bid)
            this.getApproved()
          }else{
            alert('删除失败')
          }
        },
        error=>{
          console.log(error.message);
        })
      },
      //  删除选中
      delChecked(){
        let ids=[]
        this.list.forEach(li=>{
          if(li.checked){
            ids.push(li.cid)
          }
        })
        if(ids!=''){
          this.$axios.post('http://localhost:8081/api/commentary/delAll',ids)
          .then(res=>{
            if(res.data){
              alert('删除成功')
              this.currentCommentary(sessionStorage.getItem('abid'))
            }
          },
          error=>{
            console.log(error.message);
          })
        }
      },
      test1(){
        this.$axios.post('http://localhost:8081/api/commentary/findByIdPage',{
          bid:1,
          pageIndex:1,
          pageSize:6
        }).then(res=>{
          console.log(res.data);
        },error=>{
          console.log(error.message);
        })
      }
    },
    computed:{
      ...mapState('commentaryOptions',{commentaryList:'commentaryList'})
    },
    mounted() {
      // this.test1()
      let abid=sessionStorage.getItem('abid')
      this.currentCommentary(abid)
      // setInterval(() => {
      //   this.getApproved()
      // }, 200);
      setTimeout(() => {
        this.getApproved()
      }, 200);
    },
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
button{
  height: 30px;
}
</style>