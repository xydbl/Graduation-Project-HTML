<template>
	<div class="editing">
		<div class="left">
			<span>请输入标题：</span><br>
			<span>类型：</span><br>
			<span>请选择封面：</span><br>
			<div style="position: relative;top: 200px;">
				<span>内容：</span>
			</div>
		</div>
		<div class="top">
			<button @click="save">保存</button>
			<button @click="pushBlog">发布</button>
		</div>
		<div class="right">
			<input type="text" class="titleIn inputcss" v-model="title" @input="titleIsTrue"><br>
			<input type="text" class="inputcss" v-model="type" >
			<!-- <select name="" class="stype" v-model="type">
				<option value="">xxxx</option>
			</select><br> -->
			<!-- <input type="file" class="checkImg" accept=".png, .jpg, .jpeg"><br> -->
			<div class="uploadBlogImage">
				<el-upload
					class="upload-demo" 
					drag 
					action="" 
					:http-request="uploadBlogImg" 
					:limit="1" 
					multiple>
					<img v-if="img" :src="require('../assets/blogimage/'+img)">
					<i v-else class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M,只能上传一个文件</div>
				</el-upload>
			</div>
			<div class="mavonEditor">
				<mavon-editor v-model="content" @imgAdd="imgAdd1" ref="edingMd" />
			</div>
		</div>
	</div>
</template>

<script>
// 发布 博客
// import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
    name:'Editing',
	data() {
		return {
			title:'',
			type:'',
			content:'',
			newTime:new Date(),
			fromData:{},
			img:''
		}
	},
	methods: {
		...mapMutations('blogOptions',{updateBid:'UPDATEBID'}),
		// 标题是否可用
		titleIsTrue(){
			this.$axios.get(`http://localhost:8081/api/blog/findByTitle/${this.title}`)
			.then(res=>{
				if(res.data){
					alert('标题不可用')
				}
			},
			error=>{
				console.log(error.message);
			})
		},
		// 
		save(){
			this.$axios.post("http://localhost:8081/api/blog/save",{
				bid:this.bid,
				buid:this.user.uid,
				btitle:this.title,
				btype:this.type,
				bcontent:this.content,
				btime:new Date(),
				bstate:0
			}).then(res=>{
				if(res.data){
					alert("保存成功")
					sessionStorage.setItem("editing",JSON.stringify(res.data))
				}
			},
			error=>{
				alert("保存失败")
				console.log(error.message);
			})
		},
		// 保存saveBlog 所有 只在设置封面时调用 已放弃此方法
		// saveBlog(){
		// 	this.$bus.obj.append("btitle",this.title)
		// 	this.$bus.obj.append("buid",this.user.uid)
		// 	this.$bus.obj.append("btype",this.type)
		// 	this.$bus.obj.append("bcontent",this.content)
		// 	this.$bus.obj.append("btime",new Date())
		// 	this.$bus.obj.append("bstate",0)
		// 	this.$nextTick(function(){
		// 		this.$axios({
		// 			method:'post',
		// 			url:'http://localhost:8081/api/blog/saveBlog',
		// 			headers:{"Content-Type":"multipart/form-data"},
		// 			data:this.$bus.obj
		// 		}).then(res=>{
		// 			// this.$refs.clear1.clearFiles()
		// 			// console.log(res.data);
		// 			this.updateBid(res.data.bid)
		// 			this.img=res.data.bimage
		// 		},
		// 		error=>{
		// 			console.log(error.message);
		// 		})
		// 	})
		// },
		// 发布
		pushBlog() {
			this.$axios.post('http://localhost:8081/api/blog/save',{
				bid:this.bid,
				buid:this.user.uid,
				btitme:this.title,
				btype:this.type,
				bcontent:this.content,
				btime:this.newTime,
				bstate:1
			}).then(res=>{
				if(res.data){
					// alert("发布成功")
					this.$router.back()
					this.updateBid('')
				}
			},
			error=>{
				alert('发布失败')
				console.log(error.message);
			})
		},
		// 上传图片
		uploadBlogImg(params){
			let file=params.file
			let index=file.name.lastIndexOf(".")
			let extension=file.name.substr(index+1)
			let extensionList=["png","PNG","jpg","JPG","jpeg","JPEG"]
			const isLimit=file.size / 1024 / 1024 < 10;
			if(!isLimit){
				alert("文件大小超过10M")
			}else if(extensionList.indexOf(extension)<0){
				alert("文件格式不支持")
			}else{
				let obj=new FormData()
				obj.append('file',file)
				obj.append('bid',this.bid)
				// this.saveBlog()
				obj.append("btitle",this.title)
				obj.append("buid",this.user.uid)
				obj.append("btype",this.type)
				obj.append("bcontent",this.content)
				obj.append("btime",new Date())
				obj.append("bstate",0)
				this.$nextTick(function(){
					this.$axios({
						method:'post',
						url:'http://localhost:8081/api/blog/saveBlog',
						// headers:{"Content-Type":"multipart/form-data"},
						data:obj
					}).then(res=>{
						// this.$refs.clear1.clearFiles()
						// console.log(this.$refs.clear1.clearFiles());
						console.log(res.data);
						// file.clearFiles()
						this.updateBid(res.data.bid)
						this.img=res.data.bimage
						sessionStorage.setItem("editing",JSON.stringify(res.data) )
						// localStorage.setItem("editing",res.data)
					},
					error=>{
						console.log(error.message);
					})
				})
			}
		},
		// mavon-editor 图片上传
		imgAdd1(pos,file){
			let formData=new FormData()
			formData.append('file',file)
			this.$axios({
				method:'post',
				url:'http:/localhost:8081/api/mavon/imgAdd',
				data:formData
			})
			.then(res=>{
				let url='/MavonImg/'+res.data
				this.$refs.edingMd.$img2Url(pos,url)
			})
		}
	},
	computed:{
		...mapState('userOptions',{user:'user'}),
		...mapState('blogOptions',{bid:'bid'}),
	},
	mounted() {
		let editing=sessionStorage.getItem("editing")
		// console.log(editing!=''&&editing!=null);
		if(editing!=''&&editing!=null){
			let editblog=JSON.parse(editing)
			this.updateBid(editblog.bid)
			this.title=editblog.btitle
			this.type=editblog.btype
			this.content=editblog.bcontent
			this.img=editblog.bimage
		}
	},
}
</script>

<style scoped>
.editing{
	width: 1200px;
	height: 780px;
	position: relative;
	left: 200px;
	top: 20px;
	border: 1px solid silver;
	border-bottom: 0;
}
.top{
	position: relative;
	top: -485px;
	left: 1040px;
}
.top button{
	margin: 10px;
}
.left{
	position: relative;
	width: 130px;
	height: 500px;
	left: 20px;
	font-size: 18px;
	text-align: right;
}
.right{
	position: relative;
	width: 1000px;
	height: 600px;
	top: -460px;
	left: 160px;
}
input{
	height: 30px;
	width: 360px;
}
span{
	margin: 10px;
	line-height: 50px;
}
.titleIn{
	position: relative;
	top: -15px;
	margin-top: 10px;
	border-top: 0;
	border-left: 0;
	border-right: 0;
	border-bottom: 1px solid darkgrey;
	outline: none;
}
.stype{
	position: relative;
	top: 21px;
	height: 30px;
	width: 70px;
}
/* .checkImg{
	position: relative;
	top: 55px;
	left: -370px;
} */
.uploadBlogImage{
	position: relative;
	top: 30px;
}
/* .ptext{
	position: relative;
	top: 50px;
} */
.mavonEditor{
	position: relative;
	top: 80px;
	height: 400px;
}
/* .btn{
	position: relative;
	top: 10px;
	width: 60px;
	height: 30px;
} */
.inputcss{
	border-top: 0;
	border-left: 0;
	border-right: 0;
	border-bottom: 1px solid darkgrey;
	outline: none;
}
</style>