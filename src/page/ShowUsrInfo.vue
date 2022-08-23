<template>
  <div class="uInfo">
    <div class="left">
        <img v-if="user.image!=null" :src="require('../assets/userimage/'+user.image)" alt="">
        <img v-else src="../assets/White.png" alt=""><br>
        <span>昵称:{{user.nickname||user.username}}</span><br><br>
        <span style="font-size: 14px; opacity: .5;">注册时间:{{user.date1}}</span>
    </div>
	<div class="right">
        <span>&nbsp</span><br>
		<h2>他发布的博客</h2>
		<hr>
		<div>
            <el-table
                :data="tableData"
                style="width: 100%"
                row-key="bid"
                >
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
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button>
                            <router-link replace :to="{
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
	</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name:'ShowUsrInfo',
    props:['username','uid','image'],
    data() {
        return {
            tableData:[],
            total:7,
            pageIndex:1,
            user:[]
        }
    },
    methods: {
        ...mapMutations('userOptions',{getBlogUserMessage:'GETBLOGUSERMESSAGE'}),
        handelCurrentChange(val){
            this.pageIndex=val
            this.getBlogList()
        },
        getUserMsg(){
            let id=sessionStorage.getItem('uid')
            this.$axios.get(`http://localhost:8081/api/user/findById/${id||this.uid}`)
            .then(res=>{
                this.user=res.data
            },error=>{
                console.log(error.message);
            })
        },
        getBlogList(){
            let uid=sessionStorage.getItem("uid")
            this.$axios.post('http://localhost:8081/api/blog/page/state',{
                id:this.uid||uid,
                pageIndex:this.pageIndex,
                pageSize:6,
            }).then(res=>{
                this.tableData=res.data.records
                this.total=res.data.total
            },error=>{
                console.log(error.message);
            })
        }
    },
    computed:{
        ...mapState('userOptions',{blogUser:'blogUser'}),
        // ...mapState('blogOptions',{myBlogList:'myBlogList'})
    },
    mounted(){
        let uid=sessionStorage.getItem("uid")
        if(uid==null||uid==''){
            sessionStorage.setItem('uid',this.uid)
            // console.log(this.uid,uid);
            // this.getBlogUserMessage(this.uid)
        }else{
            // this.getBlogUserMessage(uid)
        }
        this.getBlogList()
        this.getUserMsg()
        // setTimeout(() => {
        //     this.setMyBlogListTime()
        // }, 200);
    }
}
</script>

<style scoped>
.uInfo{
    position: relative;
    top: 20px;
    width: 100%;
    height: 1550px;
    /* background-color: thistle; */
    border: 1px solid rgb(106, 85, 85);
}
.left{
    position: absolute;
    width: 300px;
	left: 20px;
    height: 350px;
    text-align: center;
    /* background-color: #fff; */
}
.left img{
    margin: 20px;
    width: 200px;
    height: 200px;
    border: 1px solid black;
    border-radius: 50%;
}
.right{
	position: absolute;
	right: 90px;
	width: 900px;
	height: 600px;
	/* background-color: #fff; */
}
.right h2{
	margin-left: 30px;
}
.right hr{
	border: 2px solid bisque;
}
.pagination{
    position: relative;
    top: 20px;
}
</style>