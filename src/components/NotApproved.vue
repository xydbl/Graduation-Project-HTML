<template>
  <div>
    <table>
        <thead>
            <tr>
              <td>选中</td>
              <td>评论内容</td>
              <td>评论人</td>
              <td>评论时间</td>
              <td><button @click="adoptCommAll">批量通过</button><button @click="delCommAll">批量删除</button></td>
            </tr>
        </thead>
        <tbody>
            <tr valign=middle bgcolor=#E3E7EB v-for=" li in noList" :key="li.cid">
              <td><input type="checkbox" :checked="li.checked" @change="checked2(li)"></td>
              <td>{{li.message}}</td>
              <td>{{li.messageId}}</td>
              <td>{{li.ctime}}</td>
              <td><span @click="currentComm(li.cid,li.clogId)">通过</span> 
              <span style="color: red;" @click="delComm(li.cid,li.clogId)">删除</span></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:'NotApproved',
    props:["bid"],
    data() {
      return {
        noList:[]
      }
    },
    methods:{
      ...mapMutations('commentaryOptions',{currentCommentary:'CURRENTCOMMENTARY'}),
      // 获取 未经过审核的评论
      getNoApproved(){
        this.noList=this.commentaryList
        this.noList = this.noList.filter((li)=>{
          return li.ctype==0
        })
      },
      // 通过审核
      currentComm(id,bid){
        this.$axios.post('http://localhost:8081/api/commentary/updateType',{
          cid:id,
          ctype:1
        })
        .then(res=>{
          if(res.data){
            alert('审核通过成功')
            this.currentCommentary(bid)
          }else{
            alert('审核失败，请重试')
          }
        },
        error=>{
          console.log(error.message);
        })
      },
      //  选中
      checked2(li){
        if(!li.checked){
          if(li.checked==null||li.checked==undefined){
            this.$set(li,'checked',true)
          }else{
            li.checked=true
          }
        }else{
          li.checked=false
        }
      },
      // 批量通过
      adoptCommAll(){
        let comm=[]
        this.noList.forEach(li=>{
          if(li.checked){
            let c={}
            c.cid=li.cid
            c.ctype=1
            comm.push(c)
          }
        })
        if(comm!=''){
          this.$axios.post('http://localhost:8081/api/commentary/updateAll',comm)
          .then(res=>{
            if (res.data) {
              alert('成功')
              this.currentCommentary(sessionStorage.getItem('abid'))
            }
          },
          error=>{
            console.log(error.message);
            alert('失败,请重试')
          })
        }
      },
      // 批量删除
      delCommAll(){
        let ids=[]
        this.noList.forEach(li=>{
          if(li.checked){
            ids.push(li.cid)
          }
        })
        if(ids!=''){
           this.$axios.post('http://localhost:8081/api/commentary/delAll',ids)
          .then(res=>{
            if(res.data){
              alert('成功')
              this.currentCommentary(sessionStorage.getItem('abid'))
            }
          },error=>{
            console.log(error.message);
            alert('失败')
          })
        }
      },
      // 删除评论
      delComm(id,bid){
        this.$axios.get(`http://localhost:8081/api/commentary/del/${id}`)
        .then(res=>{
          if(res.data){
            alert('删除成功')
            this.currentCommentary(bid)
          }else(
            alert('删除失败，请重试')
          )
        },
        error=>{
          console.log(error.message);
        })
      }
    },
    computed:{
      ...mapState('commentaryOptions',{commentaryList:'commentaryList'})
    },
    mounted(){
      // 初始化
      let abid=sessionStorage.getItem('abid')
      if(abid==null||abid==''){
        this.currentCommentary(this.bid)
        sessionStorage.setItem("abid",this.bid)
      }else{
        this.currentCommentary(abid)
      }
      setInterval(() => {
        this.getNoApproved()
        // this.setCommentaryList()
      }, 200)
      // setTimeout(() => {
      //   // this.setCommentaryList()
      // }, 100);
    }
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
  margin-left: 10px;
}
</style>