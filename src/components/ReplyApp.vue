<template>
  <div>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="delAll">删除选中</el-button>
        <el-button @click="updateReplyAll">批量通过</el-button>
        <el-button @click="displayReply" v-if="display">隐藏已通过</el-button>
        <el-button @click="blockReply" v-else>取消隐藏(已通过)</el-button>
        <el-button v-if="display1" @click="displayReply1">隐藏未通过</el-button>
        <el-button v-else @click="blockReply1">取消隐藏(未通过)</el-button>
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
        prop="hmessage"
        label="回复的内容"
        width="300">
            <template slot-scope="scope">{{scope.row.hmessage}}</template>
        </el-table-column>
        <el-table-column
        prop="hcid"
        label="回复的评论"
        width="240">
            <template slot-scope="scope">{{scope.row.hcid}}</template>   
        </el-table-column>
        <el-table-column
        prop="husr" 
        label="回复人">
            <template slot-scope="scope">{{scope.row.husr||'游客'}}</template>
        </el-table-column>
        <el-table-column
        prop="htime"
        label="日期"
        >
        <template slot-scope="scope">{{ scope.row.htime }}</template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="delReply(scope.row.hid)">删除</el-button>
                <el-button size="mini" @click="updateReply(scope.row.hid)" v-if="scope.row.state==0">通过</el-button>
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
export default {
    name:'ReplyApp',
    data() {
        return {
            multipleSelection: [],
            tableData:[],
            // 数据备份
            list:[],
            total:7,
            display:true,
            display1:true,
            pageIndex:1
        }
    },
    methods: {
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
            this.getReply()
        },
        // 获取
        getReply(){
            let bid=sessionStorage.getItem('abid')
            this.$axios.post('http://localhost:8081/api/reply/findByBid',{
                bid:bid,
                pageIndex:this.pageIndex,
                pageSize:7
            })
            .then(res=>{
                // console.log(res.data);
                this.tableData=res.data.records
                this.total=res.data.total
                // console.log(res.data);
                this.list=res.data.records
            },error=>{
                console.log(error.message);
            })
        },
        // 删除
        delReply(hid){
            this.$axios.get(`http://localhost:8081/reply/del/${hid}`)
            .then(res=>{
                this.getReply()
                this.$message.success('已删除')
            },error=>{
                console.log(error.message);
            })
        },
        // 批量删除
        delAll(){
            let list=[]
            this.multipleSelection.forEach(li=>{
                list.push(li.hid)
            })
            if(list==''){
                this.$message.warning('选择为空')
                return false
            }
            this.$axios({
                method:'post',
                url:'http://localhost:8081/api/reply/delAll',
                data:list
            }).then(res=>{
                if(res.data){
                    this.getReply()
                    this.$message.success('已删除')
                }else{
                    this.$message.error('删除失败')
                }
            },error=>{
                console.log(error.message);
                this.$message.error('删除失败')
            })
        },
        updateReply(hid){
            this.$axios.post('http://localhost:8081/api/reply/update',{
                hid:hid,
                state:1
            }).then(res=>{
                this.$message.success('已通过')
            },error=>{
                console.log(error.message);
                this.getReply()
            })
        },
        updateReplyAll(){
            let ids=[]
            this.multipleSelection.forEach(li=>{
                ids.push(li.hid)
            })
            if(ids==''){
                this.$message.warning("选择为空")
                return false
            }
            this.$axios.post('http://localhost:8081/api/reply',ids)
            .then(res=>{
                if(res.data){
                    this.$message.success("成功")
                }else{
                    this.$message.warning('失败')
                }
            },error=>{
                console.log(error.message);
                this.message.warning("失败")
            })
        },
        //  隐藏
        displayReply(){
            this.tableData= this.tableData.filter((li)=>{
                return li.state==0
            })
            this.display=false
        },
        blockReply(){
            // this.getReply()
            if(this.display1){
                this.tableData=this.list
            }else{
                this.tableData=this.list.filter((li)=>{
                    return li.state==1
                })
            }
            this.display=true
        },
        displayReply1(){
            this.tableData=this.tableData.filter((li)=>{
                return li.state==1
            })
            this.display1=false
        },
        blockReply1(){
            if(this.display){
                this.tableData=this.list
            }else{
                this.tableData=this.list.filter((li)=>{
                    return li.state==0
                })
            }
            this.display1=true
        }
    },
    mounted() {
        this.getReply()
    },
}
</script>

<style>

</style>