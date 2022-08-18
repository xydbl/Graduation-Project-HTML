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
			<input type="text" name="msg" v-model="msg">
			<div @click="getIdentifyCode" style="position: absolute;top: 16px;right: 10px;width: 120px;
			height: 40px;font-size: 20px;text-align: center;line-height: 40px;cursor: pointer;">
				<!-- <span>{{identifyCode}}</span> -->
				<canvas ref="verify" style="cursor: pointer;" :width="width" :height="height"></canvas>
			</div>
			<br>
		</div>
		<div style="color:red;" v-if=""></div>
		<!-- <br> -->
		<div class="checkbox11">
			<input type="checkbox" v-model="user.remember">记住用户名
		</div>
		<br>
		<br>
		<input type="button" class="btn1" value="登录" @click="Login">
	</div>
</template>

<script>
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
				msg:'',
				identifyCode:'',
				width:120,
				height:40
			}
		},
		methods: {
			Login(){
				if(this.msg==this.identifyCode){
					this.$axios.post('http://localhost:8080/user/login',{
						username:this.user.userName,
						password:this.user.passWord,
						logintime:new Date()
					})
					.then(res=>{
						// 记住用户名
						if(this.user.remember){
							localStorage.setItem('username',this.user.userName)
							localStorage.setItem('isLoginOut',true)
							localStorage.setItem('remember',true)
						}else{
							localStorage.setItem('username','')
							localStorage.setItem('remember',false)
						}
						const usrlon=true
						this.$store.commit('userOptions/UPDATAISLOGIN',usrlon)
						this.$store.commit('userOptions/UPDATAUSER',res.data)
						// console.log(res.data);
						this.$store.commit('userOptions/TOURISTS',false)
						this.$router.push({path:'/frontPage'})
						// this.$router.push({path:redirect})
						// this.getUserMessage(res.data.username)
					},
					error=>{
						alert('登录失败!')
						console.log(error.message);
						this.getIdentifyCode()
					})
				}else{
					alert('验证码错误')
					this.getIdentifyCode()
				}
				
			},
			// 验证码刷新 
			getIdentifyCode(){
				this.$axios.get('http://localhost:8080/user/captcha')
				.then(res=>{
					this.identifyCode=res.data
					this.$nextTick(function(){
						this.draw()
					})
				},
				error=>{
					console.log(error.message);
				})
			},
			// getUserMessage(username){
			// 	axios.get(`http://localhost:8080/user/${username}`)
			// 	.then(res=>{
			// 		res.data
			// 	},
			// 	error=>{
			// 		console.log(error.message);
			// 	})
			// },
			// 删除随机数
			randomNum(min,max){
				return parseInt(Math.random() * (max-min) +min)
			},
			// 生成随机颜色
			randomColor(min,max){
				const r=this.randomNum(min,max)
				const g=this.randomNum(min,max)
				const b=this.randomNum(min,max)
				return `rgb(${r},${g},${b})`
			},
			draw(){
				let imgCode=''
				let bcolor=this.$refs.verify.getContext('2d')
				bcolor.fillStyle=this.randomColor(180,230)
				bcolor.fillRect(0,0,this.width,this.height)
				for (let i = 0; i <this.identifyCode.length ; i++) {
					imgCode+=this.identifyCode[i]
					const fontsize=this.randomNum(18,40)
					const deg=this.randomNum(-30,30)
					bcolor.font=fontsize+'px Simhei'
					bcolor.textBaseline='top'
					bcolor.fillStyle=this.randomColor(80,150)
					bcolor.save()
					bcolor.translate(30*i +15,15)
					bcolor.rotate((deg * Math.PI)/180)
					bcolor.fillText(this.identifyCode[i],-15+5,-15)
					bcolor.restore()
				}
				// 生成干扰线
				for (let i = 0; i < 5; i++) {
					bcolor.beginPath()
					bcolor.moveTo(this.randomNum(0,this.width),this.randomNum(0,this.height))		
					bcolor.lineTo(this.randomNum(0,this.width),this.randomNum(0,this.height))
					bcolor.strokeStyle=this.randomColor(180,230)
					bcolor.closePath()
					bcolor.stroke()		
				}
				return imgCode
			}
		},
		mounted(){
			// 记住用户名
			if(localStorage.getItem('username')){
				this.user.userName=localStorage.getItem('username')
				this.user.remember= localStorage.getItem('remember')
			}
			// 验证码
			this.getIdentifyCode()
		}
	}
</script>

<style scoped>
.login{
	position: relative;
	top: 150px;
	left: 600px;
	height: 400px;
	width: 420px;
	/* border-top: 2px solid #666; */
	font-size: 15px;
	text-align: right;
	padding-right: 40px;
	box-shadow: 4px 4px 15px #666;
}
.box1 input{
	height: 35px;
	width: 300px;
	margin-top: 15px;
}
.login span{
	padding-right: 15px;
}
.msg{
	width: 370px;
	text-align: left;
	position: relative;
	left: 56px;
}
.msg input{
	height: 35px;
	margin-top: 15px;
}
.checkbox11{
	margin-top: 8px;
	position: relative;
	float: left;
	left: 110px;
	text-align: left;
}
.btn1{
	height: 40px;
	width: 300px;
}
</style>