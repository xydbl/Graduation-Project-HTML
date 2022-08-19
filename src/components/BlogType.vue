<template>
  <div>
    <div style="margin-top: 20px;position:relative;left:60px;">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="delAll">删除选中</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 700px;position:relative;left:60px;top:20px"
        row-key="tid"
        @selection-change="handleSelectionChange">

        <el-table-column
        type="selection"
        width="55">
        </el-table-column>

        <el-table-column 
        prop="blogtype"
        label="类型"
        width="320" align="center" height="90px">
            <template slot-scope="scope">
                <span v-if="!scope.row.isEdit">{{scope.row.blogtype}}</span>
                <input type="text" v-else v-model="scope.row.blogtype" @blur="end(scope.row)" ref="update1">
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="updateBlog(scope.row)" v-if="!scope.row.isEdit">修改</el-button>
                <el-button size="mini" v-if="scope.row.isEdit">取消</el-button>
                <el-button size="mini" @click="updateEnd(scope.row)" v-if="scope.row.isEdit" >修改完成</el-button>
                <el-button size="mini" @click="del(scope.row.tid)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'BlogType',
    data() {
        return {
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        },
        getBlogTypeList(){
            this.$axios.get('http://localhost:8081/api/blogType/findAll')
            .then(res=>{
                // console.log(res.data);
                this.tableData=res.data
            },error=>{
                console.log(error.message);
            })
        },
        inputType(li){
            console.log(li);
        },
        updateBlog(li){
            if(li.isEdit==null||li.isEdit==undefined){
                this.$set(li,'isEdit',true)
            }else{
                li.isEdit=true
            }
            this.$nextTick(function(){
                this.$refs.update1.focus()
            })
        },

        updateEnd(li){
            li.isEdit=false
            // console.log(li)
            this.$axios.post('http://localhost:8081/api/blogType/update',{
                tid:li.tid,
                blogtype:li.blogtype
            })
            .then(res=>{
                // console.log(res.data);
                this.getBlogTypeList()
                this.$message.success('修改成功')
            },error=>{
                console.log(error.message);
                this.$message.warning('失败')
            })
        },
        del(tid){
            let sure=confirm('确认删除吗？')
            if (!sure) {
                return false
            }
            this.$axios.get(`http://localhost:8081/api/blogType/del/${tid}`)
            .then(res=>{
                // console.log(res.data);
                this.$message.success('删除成功')
                this.getBlogTypeList()
            },error=>{
                console.log(error.message);
                this.$message.warning('删除失败')
            })
        },
        delAll(){
            let ids=[]
            this.multipleSelection.forEach(li=>{
                ids.push(li.tid)
            })
            if(ids==''){
                this.$message.warning('选中为空')
                return false
            }
            this.$axios.post('http://localhost:8081/api/blogType/delAll',ids)
            .then(res=>{
                // console.log(res.data);
                this.$message.success("删除成功")
                this.getBlogTypeList()
            },error=>{
                console.log(error.message);
                this.$message.warning('删除失败')
            })
        },
        end(li){
            setTimeout(() => {
                li.isEdit=false
            }, 200);
        }
    },
    mounted() {
        this.getBlogTypeList()
    },
}
</script>

<style scoped>

</style>