<template>
  <div>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="delAll">删除选中</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="bid"
        @selection-change="handleSelectionChange">

        <el-table-column
        type="selection"
        width="55">
        </el-table-column>

        <el-table-column 
        prop="bimage"
        label="封面"
        width="320" align="center" height="90px">
            <template slot-scope="scope">
                <img v-if="scope.row.bimage!=null&&scope.row.bimage!=''" :src="require('../assets/blogimage/'+scope.row.bimage)" alt="" style="width:160px;height:90px;">
                <img v-else src="../assets/White.png" alt="" style="width:160px;height:90px;">
            </template>
        </el-table-column>
        <el-table-column
        prop="btitle"
        label="标题"
        width="240">
            <template slot-scope="scope">{{scope.row.btitle}}</template>   
        </el-table-column>

        <el-table-column
        prop="btime"
        label="日期"
        >
        <template slot-scope="scope">{{ scope.row.btime }}</template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="delCollect(scope.row.bid)">删除</el-button>
                <el-button size="mini">
                    <router-link :to="{
                        name:'blog',
                        params:{
                            bid:scope.row.bid,
                            btitle:scope.row.btime,
                            btype:scope.row.btype,
                            bcontent:scope.row.bcontent,
                            btime:scope.row.btime
                        }
                    }">点击查看</router-link>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'Collect',
    data() {
        return {
            collectList:[],
            multipleSelection: [],
            tableData:[]
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
        // 
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        },
       
        // 获取
        getMyCollect(){
            this.$axios.get(`http://localhost:8081/api/collect/findByUid/${this.user.uid}`)
            .then(res=>{
                this.collectList=res.data
                this.tableData=res.data
            },
            error=>{
                console.log(error.message);
            })
        },
        // 删除
        delCollect(bid){
            // console.log(bid);
            this.$axios.get(`http://localhost:8081/api/collect/delById/${bid}`)
            .then(res=>{
                if (res.data) {
                    // alert('成功')
                    this.$message({
                        message:'成功删除',
                        type:'success'
                    })
                }
            },
            error=>{
                console.log(error.message)
                this.$message.warning('删除失败')
            })
        },
        // 批量删除
        delAll(){
            let delList=[]
            this.multipleSelection.forEach(li=>{
                delList.push(li.bid)
            })
            if(delList==''){
                // alert("选中为空")
                this.$message.warning('选中为空')
                return false
            }
            this.$axios({
                method:'post',
                url:'http://localhost:8081/api/collect/delAll',
                data:delList
            }).then(res=>{
                // res.data
                this.$message.success('成功')
            },
            error=>{
                console.log(error.message);
            })
        }
    },
    computed:{
        ...mapState("userOptions",{user:'user'})
    },
    mounted() {
        setTimeout(() => {
        this.getMyCollect()
        }, 100);
    },
}
</script>

<style scoped>

</style>