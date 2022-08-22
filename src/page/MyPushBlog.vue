<template>
  <div >
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
                <el-button size="mini">
                    <router-link :to="{
                        name:'notApproved',
                        params:{
                            bid:scope.row.bid
                        }
                    }">审核评论</router-link>
                </el-button>
                <el-button size="mini">
                    <router-link :to="{
                        name:'editblog',
                        params:{
                            bid:scope.row.bid,
                            btitle:scope.row.btitle,
                            btype:scope.row.btype,
                            bimage:scope.row.bimage,
                            bcontent:scope.row.bcontent
                        }
                    }">修改博客</router-link>
                </el-button><br>
                <el-button size="mini" @click="delBlog(scope.row.bid)" style="margin-top:10px;">删除</el-button>
                <el-button size="mini" v-if="scope.row.bstate==1" @click="updateBlog(scope.row.bid)">取消发布</el-button>
                <el-button size="mini" v-else @click="pushBlog(scope.row.bid)">发布</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination
        :page-size="5"
        :current-page="pageIndex"
        @current-change="handelCurrentChange"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:'MyPushBlog',
    data() {
        return {
            // myBlogList:[]
            multipleSelection: [],
            tableData:[],
            total:7,
            pageIndex:1
        }
    },
    methods: {
        // ...mapMutations('blogOptions',{getMyBlogList:'GETMYBLOGLIST'}),

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
            this.getMyBlogPage()
        },
        //  加载数据
        getMyBlogPage(){
            this.$axios.post('http://localhost:8081/api/blog/page/uid',{
                id:this.user.uid,
                pageIndex:this.pageIndex,
                pageSize:5
            }).then(res=>{
                // console.log(res.data);
                this.tableData=res.data.records
                this.total=res.data.total
            },error=>{
                console.log(error.message);
            })
        },        // 删除
        delBlog(bid){
            let sure=confirm('确定删除吗？删除的内容将无法找回')
            if(sure){
                this.$axios.post('http://localhost:8081/api/blog/delById',{
                    bid:bid
                })
                .then(res=>{
                    this.getMyBlogPage()
                },
                error=>{
                    console.log(error.message);
                })
            }
        },
        // 取消发布
        updateBlog(bid){
            this.$axios.post('http://localhost:8081/api/blog/save',{
                bid:bid,
                bstate:0
            }).then(res=>{
                this.$message.success("成功")
                this.getMyBlogPage()
            },error=>{
                this.$message.warning("失败")
                console.log(error.message);
            })
        },
        pushBlog(bid){
            this.$axios.post('http://localhost:8081/api/blog/save',{
                bid:bid,
                bstate:1
            }).then(res=>{
                this.getMyBlogPage()
                this.$message.success("成功")
            },error=>{
                this.$message.warning("失败")
                console.log(error.message);
            })
        }
    },
    computed:{
        ...mapState('userOptions',{user:'user'}),
        // ...mapState('blogOptions',{myBlogList:'myBlogList'}),
    },
    mounted(){
        setTimeout(() => {
            // this.findBlog()
            // this.getMyBlogList(this.user.uid)
            this.getMyBlogPage()
        }, 500);
    }
}
</script>

<style scoped>
.pagination{
    position: relative;
    top: 20px;
}
</style>