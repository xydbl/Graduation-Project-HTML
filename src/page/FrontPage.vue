<template>
  <div style="border-top: 2px solid red; "> 
    <!-- style="border-top: 2px solid red; -->
    
    <!-- 轮播图 -->
    <div>&nbsp</div>
    <div class="carousel">
        <!-- <template> -->
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in cardItem" :key="item.bid">
            <!-- <h3 class="medium">{{ item }}</h3> -->
                <router-link :to="{
                    name:'blog',
                    params:{
                    bid:item.bid,
                    btitle:item.btitle,
                    btype:item.btype,
                    bcontent:item.bcontent,
                    btime:item.btime
                    }
                }">
                    <img v-if="item.bimage!=null&&item.bimage!=''" :src="require('../assets/blogimage/'+item.bimage)" alt="">
                    <img v-else src="../assets/White.png" alt="">
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <!-- </template> -->
    </div>
    <!-- 搜索 -->
    <div class="searchBar">
        <div class="tag">
            <el-tag size="" v-for=" li in typeList" @click="searchType(li.blogtype)" :key="li.tid" style="margin-left:20px;cursor: pointer;">{{li.blogtype}}</el-tag>
        </div>
        <input type="text" style="height:36px;width:360px;" placeholder="请输入要搜索的内容" v-model="search" @keyup.enter="SearchBlog">
        <el-button type="primary" icon="el-icon-search" @click="SearchBlog">搜索</el-button>
    </div>
    <!-- 首页导航 -->
    <!-- <div class="navigation">
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
    </div> -->
    <!-- 首页展示 -->
    <div class="exhibit">
        <div style="border-bottom: 2px solid red;height:60px;">
            <h2 style="position:relative;left:20px">new</h2>
        </div>
        <div class="blogExhibit">
            <div v-for="list in pageList.records" :key="list.bid">
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
                    <img v-if="list.bimage!=null&&list.bimage!=''" :src="require('../assets/blogimage/'+list.bimage)" style="width:160px;height:90px;">
                    <img v-else src="../assets/White.png" alt="" style="width:160px;height:90px;">
                    <div class="false1" style="height: 90px;width: 600px; position: relative;left: 170px;top: -94px;">
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
        :page-size="6"
        :current-page="pageIndex"
        @current-change="handelCurrentChange"
        layout="prev, pager, next, jumper"
        :total="pageList.total">
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
            // 博客列表
            blogList:[],
            titleBlog:'',
            // 搜索
            search:'',
            oldSearch:'',
            // 分页查询的结果
            pageList:[],
            // 页数
            pageIndex:1,
            // 状态, 0 初始  1 按title查询 2 按type查询
            state:0,
            typeList:[],
            cardItem:[]
        }
    },
    methods: {
        // 
        handelCurrentChange(val){
            this.pageIndex=val
            if(this.state==0){
                this.getPage()
            }else if(this.state==1){
                this.SearchBlog()
            }else if(this.state==2){
                this.searchType()
            }
        },
        // 获取轮播图 数据
        getBlogCard(){
            this.$axios.get('http://localhost:8081/api/blog/findCard')
            .then(res=>{
                // console.log(res.data);
                this.cardItem=res.data
            },error=>{
                console.log(error.message);
            })
        },
        // 分页查询
        getPage(){
            // console.log('111');
            // console.log(this.pageIndex);
            this.$axios.post("http://localhost:8081/api/blog/page",{
                pageIndex:this.pageIndex,
                pageSize:6
            }).then(res=>{
                this.pageList=res.data
                // console.log(res.data);
            },error=>{
                console.log(error.message);
            })
        },
        // 加载
        // getBlogList(){
        //     this.$axios.get("http://localhost:8081/api/blog/findAll")
        //     .then(res=>{
        //         this.blogList= res.data
        //         // this.blogList= this.blogList.filter((li)=>{
        //         //     return li.bstate==1
        //         // })
        //     },error=>{
        //         console.log(error.message);
        //     })
        // },
        
        // 数据处理
        // listManage(){
        //     this.blogList.forEach(li=>{
        //         li.btime=new Date(li.btime).getFullYear()
        //     })
        // },

        // 搜索 title 分页
        SearchBlog(){
            if(this.state==0){
                this.pageIndex=1
                this.state=1
            }
            if(this.search==''){
                this.pageIndex=1
                this.getPage()
                this.state=0
                return false
            }
            if(this.oldSearch==''){
                this.oldSearch=this.search
            }else {
                if(this.oldSearch!=this.search){
                    this.pageIndex=1
                    this.oldSearch=this.search
                }
            }

            this.$axios.post('http://localhost:8081/api/blog/page/likeTitle',{
                title:this.search,
                pageIndex:this.pageIndex,
                pageSize:6
            })
            .then(res=>{
                this.pageList=res.data
            },
            error=>{
                console.log(error.message);
            })
        },
        // searchEnd(){
        //     if(this.search==''){
        //         // this.getBlogList()
        //     }
        // },
        // 按类型搜索
        searchType(type){
            if(this.state!=2){
                this.pageIndex=1
                this.state=2
            }
            this.$axios.post('http://localhost:8081/api/blog/page/likeType',{
                type:type,
                pageIndex:this.pageIndex,
                pageSize:6
            })
            .then(res=>{
                this.pageList=res.data
            },error=>{
                console.log(error.message);
            })
        },
        // 查询类型
        getBlogType(){
            this.$axios.get('http://localhost:8081/api/blogType/findR')
            .then(res=>{
                // console.log(res.data);
                this.typeList=res.data
            },error=>{
                console.log(error.message);
            })
        }
    },
    mounted(){
        // this.getBlogList()
        this.getPage()
        this.getBlogType()
        this.getBlogCard()
        // setInterval(() => {
        //     this.listManage()
        // }, 1000);
        // this.$axios.get('http://localhost:8081/api/blog/')
        // .then(res=>{
        //     this.blog=res.data
        // },
        // error=>{
        //     console.log(error.message);
        // })
    },
    computed:{
        ...mapState('blogOptions',{myBlogList:'myBlogList'}),
        // 图片加载
        // getImgUrl(url){
        //     return require("@/assets/blogimage/"+url)
        // }
    }
}
</script>

<style scoped>
.searchBar{
    position: relative;
    width: 460px;
    left: 550px;
    top: 20px;
}

/* .navigation{
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
    position: relative;
} */

.carousel{
    position: relative;
    /* width: 100%; */
    left: 2%;
    width: 96%;
    /* right: 2%; */
    top: -40px;
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
    top: 50px;
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
    width: 800px;
    left: 460px;
    /* top: 20px; */
    margin-top: 40px;
}
.tag{
    position: relative;
    left: -420px;
}
</style>