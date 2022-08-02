<template>
	<div class="login">
		<div class="box1">
			<span>用户名</span>
			<input type="text" name="username" v-model="user.userName"><br>
			<span>密  码</span>
			<input type="password" name="password" v-model="user.passWord"><br>
		</div>
		<div class="msg">
			<span>验证码</span>
			<input type="text" name="msg" v-model="msg"><img src="" alt=""><br>
		</div>
		<div style="color:red;" v-if=""></div>
		<input type="checkbox" v-model="user.remember">记住用户名<br>
		
		<input type="button" class="btn1" value="登录" @click="Login">
	</div>
</template>

<script>
import axios from 'axios'
import {mapState ,mapGetters,mapActions,mapMutations} from 'vuex'
	export default {
		name:'Login',
		data() {
			return {
				user:{
					userName:'',
					passWord:'',
					remember:false,
				},
				msg:''
			}
		},
		methods: {
			Login(){
				axios.post('http://localhost:8080/user/login',{
						username:this.user.userName,
						password:this.user.passWord,
				})
				.then(res=>{
					res.data
					// this.$store.commit
					const usrlon=true
					this.$store.commit('UPDATAISLOGIN',usrlon)
					this.$store.commit('UPDATAUSER',res.data)
				},
				error=>{
					alert('登录失败!')
					console.log(error.message);
				})
			},
		},
		computed:{
		}
	}
</script>

<style scoped>
.login{
	position: relative;
	left: 950px;
	height: 400px;
	width: 400px;
	font-size: 15px;
	text-align: right;
}
.box1 input{
	height: 35px;
	width: 300px;
	margin-top: 15px;
}
.login span{
	padding-right: 15px;
}
.msg input{
	height: 35px;
	margin-top: 15px;
}
.btn1{
	height: 40px;
	width: 300px;
}
</style>