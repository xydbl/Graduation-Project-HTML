<template>
  <div>
    <div class="editing">
		<div class="left">
			<span>请输入标题：</span><br>
			<span>类型：</span><br>
			<span>请选择封面：</span><br>
			<span>内容：</span>
		</div>
		<div class="right">
			<input type="text" class="titleIn" v-model="title"><br>
			<select name="" class="stype" v-model="type">
				<option value="">xxxx</option>
			</select><br>
			<input type="file" class="checkImg" accept=".png, .jpg, .jpeg"><br>
			<textarea v-model="content" cols="60" rows="20" class="ptext"></textarea>
			<button class="btn">修改完成</button>
		</div>
	</div>
  </div>
</template>

<script>
export default {
    name:'EditBlog',
    data() {
		return {
			title:'',
			type:'',
			content:'',
      //  修改时间
			newTime:new Date()
		}
	},
}
</script>

<style scoped>
.editing{
	width: 600px;
	height: 700px;
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
	width: 350px;
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
.titleIn{
	border-top: 0;
	border-left: 0;
	border-right: 0;
	border-bottom: 1px solid darkgrey;
	/* border: 0; */
	outline: none;
}
.stype{
	position: relative;
	top: 21px;
	height: 30px;
	width: 70px;
}
.checkImg{
	position: relative;
	top: 40px;
}
.ptext{
	position: relative;
	top: 50px;
}
.btn{
	position: relative;
	top: 60px;
	width: 80px;
	height: 30px;
}
</style>