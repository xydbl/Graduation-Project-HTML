<template>
  <div class="uInfo">
    <div class="left">
        <img :src="require('../assets/userimage/'+blogUser.image)" alt=""><br>
        <span>昵称:{{blogUser.username}}</span><br><br>
        <span style="font-size: 14px; opacity: .5;">注册时间:{{blogUser.date1}}</span>
    </div>
	<div class="right">
		<h2>他发布的博客</h2>
		<hr>
		<div class="btble" v-for="list in myBlogList" :key="list.bid" >
			<router-link :to="{
                name:'blog',
                params:{
                    bid:list.bid,
                    btitle:list.btitle,
                    btype:list.btype,
                    bcontent:list.bcontent,
                    btime:list.btime
                }
            }">
                <img src="" style="width:160px;height:90px;">
                <div style="position: absolute;left: 170px;top: 0;height: 90px;width: 420px;">
                    <strong style="font-size: 22px;">{{list.btitle}}</strong>
                </div>
                <div style="position: absolute;top: 0;left: 600px;height: 90px;width: 150px;text-align: center;line-height: 60px;">
                    {{list.btime}}
                </div>
            </router-link>
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
        }
    },
    methods: {
        ...mapMutations('userOptions',{getBlogUserMessage:'GETBLOGUSERMESSAGE'}),
        ...mapMutations('blogOptions',{getMyBlogList:'GETMYBLOGLIST'})
    },
    computed:{
        ...mapState('userOptions',{blogUser:'blogUser'}),
        ...mapState('blogOptions',{myBlogList:'myBlogList'})
    },
    mounted(){
        let uid=sessionStorage.getItem("uid")
        if(uid==null||uid==''){
            sessionStorage.setItem('uid',this.uid)
            this.getBlogUserMessage(this.uid)
            this.getMyBlogList(this.uid)
        }else{
            this.getBlogUserMessage(uid)
            this.getMyBlogList(uid)
        }
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
.btble{
	position: relative;
	/* left: 20px; */
	margin: 20px;
	height: 110px;
    /* background-color: rgb(24, 76, 207); */
	border-bottom: 1px solid lightsteelblue;
}
</style>