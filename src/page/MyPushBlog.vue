<template>
  <div >
    <table>
        <thead style="font-size: 20px;">
            <tr>
                <td>博客封面</td>
                <td>博客标题</td>
                <td>博客类型</td>
                <td>发布时间</td>
                <td>观看人数</td>
                <td>操作</td>
            </tr>
        </thead>
        <tbody style="font-size: 18px;">
            <tr valign=middle bgcolor=#E3E7EB>
                <td><img src="../assets/logo.png" alt="" style="width: 160px;height: 90px;"></td>
                <td>标题</td>
                <td>类型</td>
                <td>2020</td>
                <td>11111</td>
                <td>
                    <router-link to="/personalcenter/audit">审核评论 </router-link>
					<router-link to="/personalcenter/editblog">
                        <i class="el-icon-edit" circle style="background-color: #E3E7EB;border: 0;color: black;"></i>
                    </router-link>
					<i class="el-icon-delete" circle style="background-color: #E3E7EB;border: 0;color: red; cursor: pointer;" @click="delBlog"></i>
				</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name:'MyPushBlog',
    data() {
        return {
            
        }
    },
    methods: {
        // 删除
        delBlog(){
            let sure=confirm('确定删除吗？删除的内容将无法找回')
            // if(sure){
            //     this.$axios.post('http://localhost:8080/blog/',{})
            //     .then(res=>{

            //     },
            //     error=>{
            //         console.log(error.message);
            //     })
            // }
        }
    },
}
</script>

<style scoped>
.pushblog{
    margin: 20px;
    position: absolute;
    top: 20px;
}
table{
    position: relative;
    font-size: 18px;
    width: 100%;
    text-align: center;
}
a:hover{
	color: rgb(197, 120, 32);
}
i{
    margin: 6px;
}
</style>