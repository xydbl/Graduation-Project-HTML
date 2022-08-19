<template>
  <div>
	  <div class="left">
		<div class="top">
			<span><router-link to="/personalcenter">个人中心</router-link></span>
			<span></span>
			<span></span>
		</div>
		  <div style="border-bottom: 2px solid red; height:120px">
			  <span class="person1"><strong>个人中心</strong></span>
		  </div>
		  <div style="margin: 20px;">
			  <!-- <span>我发布的博客</span> -->
			  <router-link to="/personalcenter/pushblog">我发布的博客</router-link><hr>
			  <router-link to="/editing">发布博客</router-link><hr>
			  <router-link to="/personalcenter/collect">收藏</router-link><hr>
			  <router-link to="/personalcenter/blogType">类型管理</router-link>
			  <!-- <router-link to="/personalcenter/editblog">修改博客</router-link><hr> -->
			  <!-- <router-link to="/personalcenter/audit">审核博客评论</router-link><hr> -->
			  <!-- <router-link to="/personalcenter/history" >历史记录</router-link> -->
		  </div>
	  </div>
	  <div class="right">
		<div style="border-bottom: 2px solid red; font-size:21px;text-align:center;">
			<h2>xxxx   欢迎使用</h2>
		</div>
		<div>
			<!-- <keep-alive include="EditBlog"> -->
				<router-view></router-view>
			<!-- </keep-alive> -->
		</div>
	  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'PersonalCenter',
}
</script>

<style scoped>
.top{
	position: absolute;
	height: 40px;
	width: 200px;
	font-size: 18px;
	top: 5px;
	text-align: left;
}
.left{
	position: relative;
	height: 700px;
	width: 300px;
	left: 30px;
	height: 700px;
	font-size: 20px;
	text-align: center;
}
.right{
	position: absolute;
	left: 350px;
	top: 0px;
	width: 1300px;
	height: 700px;
	border-left: 2px solid sandybrown;
}
.person1{
	position: relative;
	top: -10px;
	/* height: 110px; */
	font-size: 24px;
}
hr{
	border: 0;
	background-color: #ffffff;
	height: 1px;
}
.right div{
	margin: 20px;
}
a:hover{
	color: rgb(197, 120, 32);
}
</style>