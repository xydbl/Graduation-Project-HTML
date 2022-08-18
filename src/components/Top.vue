<template>
	<div>
		<div id="top">
			<div style="width:100px;height:100%;">
				<router-link to='/frontPage' style="color:white">主页</router-link>
			</div>
			<div class="logo"><img src="" alt=""></div>
			<!-- <div class="greet">欢 迎 您 使 用</div> -->
			<div class="login" style="width:190px;height:100%;">
				<div v-if="!isLogin" style="font-size:18px">
					<!-- <span style="cursor: pointer;" @click="touristsLogin">游客登录</span>
					<span style="color:black"> / </span> -->
					<router-link to="/login" style="color:white">登录</router-link>
					<span style="color:black"> / </span>
					<router-link to="/register" style="color:white">注册</router-link>
				</div>
				<div v-if="isLogin" class="mycenter">
					<el-dropdown>
						<span class="el-dropdown-link" style="color:white;">
							我的<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown" style="color:black;">
							<!-- <el-dropdown-item v-if="!isTourist">发布</el-dropdown-item> -->
							<el-dropdown-item v-if="!isTourist">
								<router-link to="/editing">发布</router-link>
							</el-dropdown-item>
							<el-dropdown-item v-if="!isTourist">
								<router-link to="/personalcenter">个人中心</router-link>
							</el-dropdown-item>
							<el-dropdown-item v-if="!isTourist">
								<router-link to="/setting">设置</router-link>	
							</el-dropdown-item>
							<el-dropdown-item ><span @click="loginOut">退出登录</span></el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState ,mapGetters,mapActions,mapMutations} from 'vuex'
	export default {
		name:'Top',
		data() {
      		return {
      		};
    	},
    	methods: {
			// 退出登录
      		loginOut(){
				if (this.isLogin==true&&this.isTourist==false) {
					this.$axios.post('http://localhost:8081/api/user/updateUserById',{
						uid:this.user.uid,
						islogin:0
					}).then(res=>{
					},error=>{
						console.log(error.message);
					})
				}
				this.$store.commit('userOptions/UPDATAISLOGIN',false)
				this.$store.commit('userOptions/TOURISTS',false)
				// this.$store.commit('userOptions/')
				this.$router.push({path:'/frontPage'})
				localStorage.setItem('isLoginOut',false)
			},
			touristsLogin(){
				let sure=confirm(`确定以游客身份登录吗？若以游客身份登录，本网站不会记录您的所有信息，网站部分功能将不会对您开放`)
				if(sure){
					this.$store.commit('userOptions/UPDATAISLOGIN',true)
					this.$store.commit('userOptions/TOURISTS',true)
				}
			}
    	},
		computed:{
			...mapState('userOptions',{user:'user'}),
			isLogin(){
				return this.$store.state.userOptions.user.isLogin
			},
			isTourist(){
				return this.$store.state.userOptions.user.isTouristsLogin
			}
		}
	}
</script>

<style scoped>

#top{
	position: relative;
	float: left;
	width: 100%;
	height: 70px;
	background-color: rgb(84, 92, 100);
}
div{
	font-size: 22px;
	text-align:center;
	line-height: 70px;
	color: white;
}
.greet{
	position: absolute;
	top: 0;
	left: 580px;
}
.logo{
	position: absolute;
	top: 0;
	left: 350px;
}
.logo img{
	height: 70px;
	width: 140px;
}
.login{
	position:absolute;
	top: 0;
	right: 50px;
}

.mycenter{
	position: relative;
	display: inline-block;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
a:hover{
	color: rgb(197, 120, 32);
}
</style>