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
        <el-button @click="delCommAll">删除选中</el-button>
        <el-button @click="adoptCommAll">批量通过</el-button>
        <el-button  v-if="display" @click="hide1">隐藏已通过</el-button>
        <el-button  v-else @click="show1">取消隐藏(已通过)</el-button>
        <el-button v-if="dispaly1" @click="hide2">隐藏未通过</el-button>
        <el-button v-else @click="show2">取消隐藏(未通过)</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="cid">

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
            <template slot-scope="scope">{{scope.row.messageId=='' ? '游客' : scope.row.messageId }}</template>   
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
        :page-size="7"
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
        // 数据备份
        list:[],
        total:7,
        // 状态 0正常 1 隐藏已通过 2隐藏未通过 3 display和display1为空
        state:0,
        display:true,
        dispaly1:true,
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
        if(this.state==0){
          this.getCommentary()
        }else if(this.state==1){
          this.getNoApprovedComm()
        }else if(this.state==2){
          this.getApprovedComm()
        }else{
          return false
        }
        
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
          if(this.display==false){
              this.hide1()
          }
          if(this.dispaly1==false){
            this.hide2()
          }
          
        },error=>{
          console.log(error.message);
        })
      },
      // 隐藏已通过
      getNoApprovedComm(){
        let bid=sessionStorage.getItem("abid")
        this.$axios.post('http://localhost:8081/api/commentary/findNoApprovedComm',{
          bid:this.bid||bid,
          pageIndex:this.pageIndex,
          pageSize:7
        }).then(res=>{
          this.tableData=res.data.records
          this.total=res.data.total
        },error=>{
          console.log(error.message);
        })
      },
      getApprovedComm(){
        let bid=sessionStorage.getItem("abid")
        this.$axios.post('http://localhost:8081/api/commentary/findApprovedComm',{
          bid:this.bid||bid,
          pageIndex:this.pageIndex,
          pageSize:7
        }).then(res=>{
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
            if(this.state==0){
              this.getCommentary()
            }else if(this.state==1){
              this.getNoApprovedComm()
            }else if(this.state==2){
              this.getApprovedComm()
            }else{
              return false
            }
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
      adoptCommAll(){
        let comm=[]
        this.multipleSelection.forEach(li=>{
          comm.push(li.cid)
        })
        if(comm==''){
          this.$message.warning("选择为空")
          return false
        }
        this.$axios.post('http://localhost:8081/api/commentary/updateAll',comm)
        .then(res=>{
          if (res.data) {
            this.$message.success("成功")
            // alert('成功')
            // this.currentCommentary(sessionStorage.getItem('abid'))
            if(this.state==0){
              this.getCommentary()
            }else if(this.state==1){
              this.getNoApprovedComm()
            }else if(this.state==2){
              this.getApprovedComm()
            }else{
              return false
            }
          }else{
            this.$message.warning("失败，请重试")
          }
        },
        error=>{
          console.log(error.message);
          this.$message.warning("失败，请重试")
          // alert('失败,请重试')
        })
      },
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
            // alert('成功')
            this.$message.success("成功")
            if(this.state==0){
              this.getCommentary()
            }else if(this.state==1){
              this.getNoApprovedComm()
            }else if(this.state==2){
              this.getApprovedComm()
            }else{
              return false
            }
              // this.currentCommentary(sessionStorage.getItem('abid'))
          }
        },error=>{
          console.log(error.message);
          this.$message.warning("失败")
          // alert('失败')
        })
      },
      // 删除评论
      delComm(id){
        this.$axios.get(`http://localhost:8081/api/commentary/del/${id}`)
        .then(res=>{
          if(res.data){
            // alert('删除成功')
            this.$message.success("删除成功'")
            if(this.state==0){
              this.getCommentary()
            }else if(this.state==1){
              this.getNoApprovedComm()
            }else if(this.state==2){
              this.getApprovedComm()
            }else{
              return false
            }
            // this.currentCommentary(bid)
          }else(
            // alert('删除失败，请重试')
            this.$message.warning("删除失败，请重试")
          )
        },
        error=>{
          console.log(error.message);
          this.$message.warning("删除失败，请重试")
        })
      },
      // 隐藏已通过
      hide1(){
        this.pageIndex=1
        this.display=false
        if(!this.dispaly1){
          this.state=3
          this.tableData=[]
          this.total=1
        }else{
          this.getNoApprovedComm()
          this.state=1
        }
      },
      show1(){
        this.pageIndex=1
        this.display=true
        if(!this.dispaly1){
          this.getApprovedComm()
          this.state=2
        }else{
          this.getCommentary()
          this.state=0
        }
      },
      // 隐藏未通过
      hide2(){
        this.pageIndex=1
        this.dispaly1=false
        if(!this.display){
          this.state=3
          this.tableData=[]
          this.total=1
        }else{
          this.getApprovedComm()
          this.state=2
        }
      },
      show2(){
        this.pageIndex=1
        this.dispaly1=true
        if(this.display==false){
          this.getNoApprovedComm()
          this.state=1
        }
        if(this.display==true){
          this.getCommentary()
          this.state=0
        }
      },
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
      // this.getNoApprovedComm()
      //else{
      //   this.currentCommentary(abid)
      // }
      // setInterval(() => {
        // this.getCommentary()
        // this.setCommentaryList()
      // }, 200)
      // setTimeout(() => {
      //   // this.setCommentaryList()
      // }, 100);
    }
}
</script>

<style scoped>
</style>