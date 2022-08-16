<template>
  <div>
    <!-- <table>
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
    </table> -->
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button >删除选中</el-button>
        <el-button  v-if="display">隐藏已通过</el-button>
        <el-button  v-else>取消隐藏</el-button>
        <el-button>隐藏未通过</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="hid">

        <el-table-column
        type="selection"
        width="55">
        </el-table-column>

        <el-table-column 
        prop="message"
        label="评论内容"
        width="300">
            <template slot-scope="scope">{{scope.row.message}}</template>
        </el-table-column>
        <el-table-column
        prop="messageId"
        label="评论人"
        width="240">
            <template slot-scope="scope">{{scope.row.messageId}}</template>   
        </el-table-column>
        <el-table-column
        prop="ctime"
        label="评论日期"
        >
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="delComm(scope.row.cid)">删除</el-button>
                <el-button size="mini" @click="currentComm(scope.row.cid)" v-if="scope.row.ctype==0">通过</el-button>
                <el-button size="mini" v-else disabled>通过</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination
        :page-size="6"
        :current-page="pageIndex"
        @current-change="handelCurrentChange"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex'
export default {
    name:'NotApproved',
    props:["bid"],
    data() {
      return {
        // noList:[],
        multipleSelection: [],
        tableData:[],
        total:7,
        display:true,
        pageIndex:1
      }
    },
    methods:{
      // ...mapMutations('commentaryOptions',{currentCommentary:'CURRENTCOMMENTARY'}),
      toggleSelection(rows) {
        if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handelCurrentChange(val){
        this.pageIndex=val
        this.getCommentary()
      },
      // 获取评论
      getCommentary(){
        // this.noList=this.commentaryList
        // this.noList = this.noList.filter((li)=>{
        //   return li.ctype==0
        // })
        let bid=sessionStorage.getItem("abid")
        this.$axios.post("http://localhost:8081/api/commentary/findByIdPage",{
          bid:this.bid||bid,
          pageIndex:this.pageIndex,
          pageSize:7
        }).then(res=>{
          // console.log(res.data);
          this.tableData=res.data.records
          this.total=res.data.total
        },error=>{
          console.log(error.message);
        })
      },
      // 通过审核
      currentComm(id){
        this.$axios.post('http://localhost:8081/api/commentary/updateType',{
          cid:id,
          ctype:1
        })
        .then(res=>{
          if(res.data){
            // alert('审核通过成功')
            this.$message.success('success')
            // this.currentCommentary(bid)
          }else{
            // alert('审核失败，请重试')
            this.$message.warning('失败，请重试')
          }
        },
        error=>{
          console.log(error.message);
          this.$message.warning('失败，请重试')
        })
      },
      //  选中
      // checked2(li){
      //   if(!li.checked){
      //     if(li.checked==null||li.checked==undefined){
      //       this.$set(li,'checked',true)
      //     }else{
      //       li.checked=true
      //     }
      //   }else{
      //     li.checked=false
      //   }
      // },
      // 批量通过
      // adoptCommAll(){
      //   let comm=[]
      //   this.noList.forEach(li=>{
      //     if(li.checked){
      //       let c={}
      //       c.cid=li.cid
      //       c.ctype=1
      //       comm.push(c)
      //     }
      //   })
      //   if(comm!=''){
      //     this.$axios.post('http://localhost:8081/api/commentary/updateAll',comm)
      //     .then(res=>{
      //       if (res.data) {
      //         alert('成功')
      //         this.currentCommentary(sessionStorage.getItem('abid'))
      //       }
      //     },
      //     error=>{
      //       console.log(error.message);
      //       alert('失败,请重试')
      //     })
      //   }
      // },
      // 批量删除
      delCommAll(){
        let ids=[]
        // this.noList.forEach(li=>{
        //   if(li.checked){
        //     ids.push(li.cid)
        //   }
        // })
        this.multipleSelection.forEach(li=>{
          ids.push(li.cid)
        })
        if(ids==''){
          this.$message.warning('选择为空')
          return false
        }
        this.$axios.post('http://localhost:8081/api/commentary/delAll',ids)
        .then(res=>{
          if(res.data){
            alert('成功')
              // this.currentCommentary(sessionStorage.getItem('abid'))
          }
        },error=>{
          console.log(error.message);
          alert('失败')
        })
      },
      // 删除评论
      delComm(id){
        this.$axios.get(`http://localhost:8081/api/commentary/del/${id}`)
        .then(res=>{
          if(res.data){
            alert('删除成功')
            // this.currentCommentary(bid)
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
      // ...mapState('commentaryOptions',{commentaryList:'commentaryList'})
    },
    mounted(){
      // 初始化
      let abid=sessionStorage.getItem('abid')
      if(abid==null||abid==''){
        // this.currentCommentary(this.bid)
        sessionStorage.setItem("abid",this.bid)
      }
      this.getCommentary()
      //else{
      //   this.currentCommentary(abid)
      // }
      setInterval(() => {
        // this.getCommentary()
        // this.setCommentaryList()
      }, 200)
      // setTimeout(() => {
      //   // this.setCommentaryList()
      // }, 100);
    }
}
</script>

<style scoped>
</style>