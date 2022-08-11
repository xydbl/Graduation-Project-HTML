<template>
  <div style="border-top: 2px solid red; "> 
    <!-- style="border-top: 2px solid red; -->
    
    <!-- 搜索 -->
    <div class="searchBar">
        <input type="text" style="height:36px;width:360px;" placeholder="请输入要搜索的内容" v-model="search" @keyup.enter="SearchBlog">
        <el-button type="primary" icon="el-icon-search" @click="SearchBlog">搜索</el-button>
        <!-- <el-button icon="el-icon-search" circle></el-button> -->
    </div>
    <!-- 轮播图 -->
    <div class="carousel">
        <template>
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        </template>
    </div>
    <!-- 首页导航 -->
    <div class="navigation">
        <ul>
            <li>新闻</li>
            <li>军事</li>
            <li>国内</li>
            <li>航空</li>
            <li>娱乐</li>
            <li>电影</li>
            <li>音乐</li>
            <li>经典</li>
        </ul>
    </div>
    <!-- 首页展示 -->
    <div class="exhibit">
        <div style="border-bottom: 2px solid red;">
            <h2 style="position:relative;left:20px">news</h2>
        </div>
        <div class="blogExhibit">
            <div v-for="list in blogList" :key="list.bid">
                <router-link :to="{
                    name:'blog',
                    params:{
                        bid:list.bid,
                        btitle:list.btitle,
                        btype:list.btype,
                        bcontent:list.bcontent,
                        btime:list.btime
                    }
                }" >
                    <img src="" style="width:160px;height:90px;">
                    <div class="false1" style="height: 90px;width: 600px; position: relative;left: 170px;top: -94px;;">
                        <strong>{{list.btitle}}</strong>
                    </div>
                    <div style="position: relative;left:780px;width:160px;top:-185px;height:90px;text-align:center;line-height:70px;">
                        {{list.btime}}
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination
        :page-size="8"
        layout="prev, pager, next, jumper"
        :total="1000">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'FrontPage',
    data() {
        return {
            blogList:[],
            titleBlog:'',
            search:''
        }
    },
    methods: {
        // 加载
        getBlogList(){
            this.$axios.get("http://localhost:8081/api/blog/findAll")
            .then(res=>{
                this.blogList= res.data
            },error=>{
                console.log(error.message);
            })
        },
        listManage(){
            this.blogList.forEach(li=>{
                li.btime=new Date(li.btime).getFullYear()
            })
        },
        // 搜索
        SearchBlog(){
            this.$axios.get(`http://localhost:8081/api/blog/findLike/${this.search}`)
            .then(res=>{
                console.log(res.data);
            },
            error=>{
                console.log(error.message);
            })
        }
        // 按类型搜索
    },
    mounted(){
        this.getBlogList()
        setInterval(() => {
            this.listManage()
        }, 1000);
        // this.$axios.get('http://localhost:8081/api/blog/')
        // .then(res=>{
        //     this.blog=res.data
        // },
        // error=>{
        //     console.log(error.message);
        // })
    },
    computed:{
        ...mapState('blogOptions',{myBlogList:'myBlogList'})
    }
}
</script>

<style scoped>
.searchBar{
    position: relative;
    width: 460px;
    left: 450px;
    top: -35px;
}

.navigation{
    width: 250px;
    height:150px;
    line-height: 2px;
    position: relative;
    top: 30px;
}

.navigation ul li{
    display: inline-block;
    line-height: 16px;
    padding: 6px;
    margin-top: 10px;
    cursor: pointer;
    /* position: relative; */
}

.carousel{
    position: relative;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
  
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
  
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.exhibit{
    position: relative;
    margin: 5px;
    padding: 4px;
    width: 1000px;
    height: 1000px;
    top: -100px;
    left: 300px;
    border-left: 2px solid black;
}

.blogExhibit{
    position: relative;
    top: 10px;
    left: 6px;
    width: 1000px;
    height: 920px;
}
.blogExhibit div{
    margin: 30px;
	height: 120px;
    border-bottom: 1px solid bisque;
}
.blogExhibit div div{
    margin: 0px;
    border: 0;
}
.false1{
	/* text-align: center; */
    font-size: 22px;
}
.pagination{
    position: relative;
    left: 460px;
    top: -90px;
}
</style>