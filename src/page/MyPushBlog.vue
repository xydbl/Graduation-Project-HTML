<template>
  <div >
    <table>
        <thead style="font-size: 20px;">
            <tr>
                <td>博客封面</td>
                <td>博客标题</td>
                <td>博客类型</td>
                <td>发布时间</td>
                <td>评论数</td>
                <td>操作</td>
            </tr>
        </thead>
        <tbody style="font-size: 18px;">
            <tr valign=middle bgcolor=#E3E7EB v-for="list in myBlogList" :key="list.bid">
                <td><img src="" alt="" style="width: 160px;height: 90px;"></td>
                <td>{{list.btitle}}</td>
                <td>{{list.btype}}</td>
                <td>{{list.btime}}</td>
                <td>11111</td>
                <td>
                    <router-link :to="{
                        name:'notApproved',
                        params:{
                            bid:list.bid
                        }
                    }">审核评论 </router-link>
					<router-link :to="{
                        name:'editblog',
                        params:{
                            bid:list.bid,
                            btitle:list.btitle,
                            btype:list.btype,
                            bimage:list.bimage,
                            bcontent:list.bcontent
                        }
                    }" >
                        <i class="el-icon-edit" circle style="background-color: #E3E7EB;border: 0;color: black;"></i>
                    </router-link>
					<i class="el-icon-delete" circle style="background-color: #E3E7EB;border: 0;color: red; cursor: pointer;" @click="delBlog(list.bid)"></i>
				</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:'MyPushBlog',
    data() {
        return {
            // myBlogList:[]
        }
    },
    methods: {
        ...mapMutations('blogOptions',{getMyBlogList:'GETMYBLOGLIST',setMyBlogListTime:'SETMYBLOGLISTTIME'}),
        // 查询  在vuex 中进行
        // findBlog(){
        //     this.$axios.get(`http://localhost:8081/api/blog/findByUid/${this.user.uid}`)
        //     .then(res=>{
        //         this.myBlogList= res.data
        //         // console.log(res.data);
        //         console.log(res.data[0].btime);
        //     },error=>{
        //         console.log(error.message);
        //     })
        // },
        // 删除
        delBlog(bid){
            let sure=confirm('确定删除吗？删除的内容将无法找回')
            if(sure){
                this.$axios.post('http://localhost:8081/api/blog/delById',{
                    bid:bid
                })
                .then(res=>{
                    this.getMyBlogList(this.user.uid)
                    // console.log(res.data);
                },
                error=>{
                    console.log(error.message);
                })
            }
        },
    },
    computed:{
        ...mapState('userOptions',{user:'user'}),
        ...mapState('blogOptions',{myBlogList:'myBlogList'}),
    },
    mounted(){
        setTimeout(() => {
            // this.findBlog()
            this.getMyBlogList(this.user.uid)
        }, 500);
        setTimeout(() => {
            this.setMyBlogListTime()
        }, 1000);
    }
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
    /* width: 100%; */
    width: 1200px;
    text-align: center;
}
a:hover{
	color: rgb(197, 120, 32);
}
i{
    margin: 6px;
}
</style>