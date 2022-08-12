<template>
  <div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
        type="selection"
        width="55">
        </el-table-column>

        <el-table-column 
        prop="bimage"
        label="封面"
        width="320" align="center" height="90px">
            <template slot-scope="scope"><img :src="require('../assets/blogimage/'+scope.raw.bimage)" alt=""></template>
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
                <el-button size="mini">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button>删除选中</el-button>

    </div>
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
        // 
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
        },
        // 获取
        getMyCollect(){
            this.$axios.get(`http://localhost:8081/api/collect/findByUid/${this.user.uid}`)
            .then(res=>{
                this.collectList=res.data
            },
            error=>{
                console.log(error.message);
            })
        },
        // 删除
        delCollect(){
            this.$axios.get(`http://localhost:8081/api/collect/delById/${xx}`)
            .then(res=>{
                if (res.data) {
                    alert('成功')
                }
            },
            error=>{
                console.log(error.message)
            })
        },
        // 批量删除
        delAll(){
            this.$axios({
                method:'post',
                url:'http://localhost:8081/api/collect/delAll',
                data:x
            }).then(res=>{
                res.data
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