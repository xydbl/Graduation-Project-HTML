<template>
	<div>
		<div id="top">
			<div style="width:100px;height:100%;">
				<router-link to='/frontPage' style="color:white">主页</router-link>
			</div>
			<div class="login" style="width:190px;height:100%;">
				<div v-if="!isLogin" style="font-size:18px">
					<span style="cursor: pointer;">游客登录</span>
					<span style="color:black"> / </span>
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
							<el-dropdown-item>发布</el-dropdown-item>
							<el-dropdown-item>个人中心</el-dropdown-item>
							<el-dropdown-item>
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
				// isLogin:this.user.isLogin,
      		};
    	},
    	methods: {
      		loginOut(){
				this.isLogin=false
				this.$store.commit('UPDATAISLOGIN',this.isLogin)
			}
    	},
		computed:{
			// ...mapState({user:'user'})
			isLogin(){
				return this.$store.state.user.isLogin
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
</style>