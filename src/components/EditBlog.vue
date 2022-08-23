<template>
  <div>
    <div class="editing">
		<div class="left">
			<span>请输入标题：</span><br>
			<span>类型：</span><br>
			<span>请选择封面：</span><br>
			<span class="bcontent">内容：</span>
		</div>
		<div style="position: absolute; right:30px;top:20px">
			<button class="btn" @click="saveEdit">保存</button>&nbsp
			<button class="btn" @click="editFinish">发布</button>
		</div>
		<div class="right">
			
			<input type="text" class="titleIn" v-model="title"><br>
			<!-- <select name="" class="stype" v-model="type">
				<option value="">xxxx</option>
			</select><br> -->
			<input type="text" v-model="type" class="ipt">
			<!-- <input type="file" class="checkImg" accept=".png, .jpg, .jpeg"><br> -->
			<div class="updateBlogImage">
				<el-upload
					class="upload-demo" 
					drag 
					action="" 
					:http-request="updateBlogImg" 
					:limit="1" 
					multiple>
					<img v-if="img" :src="require('../assets/blogimage/'+img)" style="width:100%;height:100%">
					<i v-else class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>
				</el-upload>
			</div>
			<div class="mavonEditor">
				<mavon-editor v-model="content" @imgAdd="imgAdd" @save="saveEdit" ref="md" />
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:'EditBlog',
    data() {
		return {
			title:this.btitle,
			type:this.btype,
			content:this.bcontent,
			img:this.bimg,
      //  修改时间
			newTime:new Date()
		}
	},
	props:['bid','btitle','btype','bimg','bcontent'],
	methods: {
		// ...mapMutations('blogOptions',{currentBlog:'CURRENTBLOG'}),
		getBlogMsg(){
			let isEdit=sessionStorage.getItem('isEdit')
			this.$axios.get(`http://localhost:8081/api/blog/findByBid/${this.bid||isEdit}`)
			.then(res=>{
				this.title= res.data.btitle
				this.type= res.data.btype
				this.content=res.data.bcontent
				this.img=res.data.bimage
				// console.log(res.data);
			},error=>{
				console.log(error.message);
			})
		},
		updateBlogImg(params){
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
				this.$axios({
					method:'post',
					url:'http://localhost:8081/api/blog/uploadInEdit',
					data:obj
				}).then(res=>{
					this.img=res.data.bimage
					// sessionStorage.setItem('isEdit',JSON.stringify(res.data))
				},error=>{
					console.log(error.message);
				})
			}
		},
        // 图片上传 Mavob-Editor
        imgAdd(pos, file){
            let formData=new FormData()
            formData.append('file',file)
            this.$axios({
                method:'post',
                url:'http://localhost:8081/api/mavon/addImg',
                data:formData
            }).then(res=>{
                let url='/MavonImg/'+res.data
                this.$refs.md.$img2Url(pos,url)
            })
        },
		// 保存
		saveEdit(){
			this.$axios.post('http://localhost:8081/api/blog/save',{
				bid:this.bid||this.blog.bid,
				btitle:this.title,
				btype:this.type,
				bcontent:this.content,
			}).then(res=>{
				// res.data
				// this.$router.go(0)
				this.$message.success("保存成功")
			},error=>{
				console.log(error.message);
			})
		},
        // 发布
		editFinish(){
			this.$axios.post('http://localhost:8081/api/blog/save',{
				bid:this.bid||this.blog.bid,
				btitle:this.title,
				btype:this.type,
				bcontent:this.content,
				bstate:1
			}).then(res=>{
				// res.data
				this.$router.back()
			},error=>{
				console.log(error.message);
			})
		}
	},
	computed:{
		...mapState('userOptions',{user:'user'}),
		// ...mapState('blogOptions',{blog:'blog'})
	},
	mounted(){
		let isEdit=sessionStorage.getItem('isEdit')
		
		if(isEdit==''||isEdit==undefined||isEdit==null){
			sessionStorage.setItem('isEdit',this.bid)
			// this.updateBid(this.bid)
			// this.currentBlog(this.bid)
		}else{
			// this.currentBlog(isEdit)
		}
		setTimeout(() => {
			this.getBlogMsg()
			// sessionStorage.setItem('editBlog',JSON.stringify(this.blog))
			// console.log(this.blog);
		}, 300);
		// setTimeout(() => {
		// 	let editBlog=sessionStorage.getItem('editBlog')
		// 	if(editBlog!=''&&editBlog!=null){
		// 		editBlog=JSON.parse(editBlog)
		// 		this.title=editBlog.btitle
		// 		this.type=editBlog.btype
		// 		this.content=editBlog.bcontent
		// 		this.img=editBlog.bimage
		// 	}
		// }, 600);
	}
}
</script>

<style scoped>
.editing{
	width: 1200px;
	height: 800px;
	position: relative;
	left: 40px;
	border: 1px solid silver;
}
.left{
	position: relative;
	width: 130px;
	height: 500px;
	left: 20px;
  top: 65px;
	font-size: 18px;
	text-align: right;
}
.right{
	position: relative;
	width: 950px;
	height: 500px;
	top: -440px;
	left: 160px;
}
input{
	height: 30px;
	width: 360px;
}
span{
	margin: 10px;
	line-height: 40px;
}
.titleIn,.ipt{
	border-top: 0;
	border-left: 0;
	border-right: 0;
	border-bottom: 1px solid darkgrey;
	/* border: 0; */
	margin-top: 5px;
	outline: none;
}
.updateBlogImage{
	margin-top: 30px;
}
.bcontent{
	position: relative;
	top: 210px;
}
.mavonEditor{
	margin-top: 30px;
}
/* .stype{
	position: relative;
	top: 21px;
	height: 30px;
	width: 70px;
} */
/* .checkImg{
	position: relative;
	top: 40px;
} */
/* .ptext{
	position: relative;
	top: 50px;
} */
.btn{
	position: relative;
	/* top: 60px; */
	/* left: 700px; */
	width: 100px;
	height: 30px;
}
</style>