<template>
  <div class="uInfo">
    <div class="left">
        <img src="../assets/logo.png" alt=""><br>
        <span>昵称:</span><br><br>
        <span style="font-size: 14px; opacity: .5;">注册时间:2020-14-17</span>
    </div>
	<div class="right">
		<h2>他发布的博客</h2>
		<hr>
		<div class="btble">
			<router-link to="/blog">
                <img src="" style="width:160px;height:90px;">
                <div style="position: absolute;left: 170px;top: 0;height: 90px;width: 420px;">
                    <strong style="font-size: 22px;">xxxxx</strong>
                </div>
                <div style="position: absolute;top: 0;left: 600px;height: 90px;width: 150px;text-align: center;line-height: 60px;">
                    2020-11-4
                </div>
            </router-link>
		</div>
	</div>
  </div>
</template>

<script>
export default {
    name:'ShowUsrInfo'
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